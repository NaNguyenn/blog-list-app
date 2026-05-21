import { render, screen } from "@testing-library/react";
import BlogDetail from "./BlogDetail";
import { useBlogDetail } from "../hooks/useBlogDetail";
import { useUser } from "../store/user";

vi.mock("../hooks/useBlogDetail", () => ({
  useBlogDetail: vi.fn(),
}));

vi.mock("../store/user", () => ({
  useUser: vi.fn(),
}));

const blog = {
  title: "Component testing is done with react-testing-library",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 1,
  comments: ["first comment"],
  user: {
    username: "first",
    name: "Matti Luukkainen",
    id: "678a2458c3c9bd4f50bdefd8",
  },
  id: "678a2e379c3089cad37a2941",
};

beforeEach(() => {
  useBlogDetail.mockReturnValue({
    blog,
    handleDeleteBlog: vi.fn(),
    handleLikeBlog: vi.fn(),
    handleAddComment: vi.fn(),
  });
});

test("<BlogDetail /> shows blog information and likes to unauthenticated users without blog action buttons", () => {
  useUser.mockReturnValue(null);

  render(<BlogDetail />);

  expect(screen.getByText(blog.title)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: blog.url })).toHaveAttribute(
    "href",
    blog.url,
  );
  expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
  expect(screen.getByText(`Added by ${blog.user.name}`)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "like" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "remove" }),
  ).not.toBeInTheDocument();
});

test("<BlogDetail /> shows only the like button to authenticated users who are not the creator", () => {
  useUser.mockReturnValue({
    username: "second",
    name: "Ada Lovelace",
    id: "678a2458c3c9bd4f50bdefd9",
  });

  render(<BlogDetail />);

  expect(screen.getByRole("button", { name: "like" })).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "remove" }),
  ).not.toBeInTheDocument();
});

test("<BlogDetail /> shows the delete button to the blog creator", () => {
  useUser.mockReturnValue({
    username: blog.user.username,
    name: blog.user.name,
    id: blog.user.id,
  });

  render(<BlogDetail />);

  expect(screen.getByRole("button", { name: "like" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "remove" })).toBeInTheDocument();
});
