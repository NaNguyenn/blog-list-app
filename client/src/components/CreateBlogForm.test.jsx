import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CreateBlogForm from "./CreateBlogForm";
import { useBlogActions } from "../store/blogs";
import { useNotificationActions } from "../store/notification";

vi.mock("../store/blogs", () => ({
  useBlogActions: vi.fn(),
}));

vi.mock("../store/notification", () => ({
  useNotificationActions: vi.fn(),
}));

const newBlog = {
  title: "Component testing is done with react-testing-library",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
};

test("<CreateBlogForm /> submits the new blog through the store and navigates back to the blog list", async () => {
  const addBlog = vi.fn().mockResolvedValue({});
  const showNotification = vi.fn();

  useBlogActions.mockReturnValue({ addBlog });
  useNotificationActions.mockReturnValue({ showNotification });

  render(
    <MemoryRouter initialEntries={["/create"]}>
      <Routes>
        <Route path="/" element={<div>blog list</div>} />
        <Route path="/create" element={<CreateBlogForm />} />
      </Routes>
    </MemoryRouter>,
  );

  const user = userEvent.setup();

  await user.type(
    screen.getByTestId("title-input"), newBlog.title,
  );
  await user.type(screen.getByTestId("author-input"), newBlog.author);
  await user.type(
    screen.getByTestId("url-input"),
    newBlog.url,
  );
  await user.click(screen.getByRole("button", { name: "create" }));

  await waitFor(() => {
    expect(addBlog).toHaveBeenCalledWith({
      author: newBlog.author,
      title: newBlog.title,
      url: newBlog.url,
    });
  });

  expect(showNotification).toHaveBeenCalledWith({
    message: `A new blog titled ${newBlog.title} by ${newBlog.author} was added`,
    type: "success",
  });
  expect(screen.getByText("blog list")).toBeInTheDocument();
});
