import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Blog from "./Blog";

const blog = {
  title: "Component testing is done with react-testing-library",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 1,
  user: {
    username: "first",
    name: "Matti Luukkainen",
    id: "678a2458c3c9bd4f50bdefd8",
  },
  id: "678a2e379c3089cad37a2941",
};

const renderBlog = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Blog blog={blog} />} />
        <Route path="/blogs/:id" element={<div>blog detail page</div>} />
      </Routes>
    </MemoryRouter>,
  );

test("<Blog /> renders the blog title, author, and show button", () => {
  renderBlog();

  expect(screen.getByTestId("blog-title")).toHaveTextContent(blog.title);
  expect(screen.getByText(blog.author, { exact: false })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "show" })).toBeInTheDocument();
});

test("<Blog /> navigates to the blog detail page when clicking 'show'", async () => {
  renderBlog();

  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "show" }));

  expect(screen.getByText("blog detail page")).toBeInTheDocument();
});
