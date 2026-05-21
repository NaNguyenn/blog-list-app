import { create } from "zustand";
import blogService from "../services/blogs";
import { useUserStore } from "./user";

const useBlogsStore = create((set, get) => ({
  blogs: [],
  actions: {
    initializeBlogs: async () => {
      const blogs = await blogService.getAll();
      set(() => ({ blogs }));
    },
    addBlog: async (blog) => {
      const user = useUserStore.getState().user;
      const { user: userId, ...newBlog } = await blogService.createBlog(blog);
      const newBlogWithUser = {
        ...newBlog,
        user: { name: user.name, username: user.username, id: userId },
      };
      set((state) => ({
        blogs: [...state.blogs, newBlogWithUser],
      }));
    },
    likeBlog: async (id) => {
      const blog = get().blogs.find((b) => b.id === id);
      await blogService.updateBlog(id, {
        ...blog,
        likes: blog.likes + 1,
      });
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog,
        ),
      }));
    },
    deleteBlog: async (id) => {
      await blogService.deleteBlog(id);
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
      }));
    },
    addComment: async (id, comment) => {
      const updatedBlog = await blogService.addComment(id, comment);
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id ? { ...blog, comments: updatedBlog.comments } : blog,
        ),
      }));
    },
  },
}));

export const useBlogs = () => {
  const blogs = useBlogsStore((state) => state.blogs);
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return sortedBlogs;
};
export const useBlogActions = () => useBlogsStore((state) => state.actions);
