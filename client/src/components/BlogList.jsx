import { useState, useEffect, useRef } from "react";

import Blog from "./Blog";
import CreateBlogForm from "./CreateBlogForm";
import { useBlogActions, useBlogs } from "../store/blogs";
import { useUser } from "../store/user";

const BlogList = () => {
  const { initializeBlogs } = useBlogActions();
  const sortedBlogs = useBlogs();

  useEffect(() => {
    if (!sortedBlogs?.length) {
      initializeBlogs();
    }
  }, [initializeBlogs, sortedBlogs?.length]);

  return (
    <>
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
