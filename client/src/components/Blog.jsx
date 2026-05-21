import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate(`/blogs/${blog.id}`);
  };

  return (
    <div data-testid="blog">
      <div>
        <span data-testid="blog-title">{blog.title}</span> {blog.author}
        <button onClick={handleNavigateToDetail}>show</button>
      </div>
    </div>
  );
};

export default Blog;
