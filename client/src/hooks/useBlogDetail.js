import { useEffect, useState } from "react";
import { useBlogActions, useBlogs } from "../store/blogs";
import { useNotificationActions } from "../store/notification";
import { useNavigate, useParams } from "react-router-dom";

export const useBlogDetail = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const sortedBlogs = useBlogs();
  const blog = sortedBlogs.find((b) => b.id === id);
  const { deleteBlog, likeBlog, addComment } = useBlogActions();
  const { showNotification } = useNotificationActions();

  const handleDeleteBlog = async () => {
    const confirmation = confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (confirmation) {
      try {
        navigate("/");
        await deleteBlog(blog.id);
        showNotification({
          message: "Blog deleted successfully",
          type: "success",
        });
      } catch (err) {
        showNotification({
          message: "Error deleting blog",
          type: "error",
        });
      }
    } else return;
  };

  const handleLikeBlog = async () => {
    try {
      await likeBlog(blog.id);
    } catch (err) {
      showNotification({
        message: "Error liking blog",
        type: "error",
      });
    }
  };

  const handleAddComment = async (comment) => {
    try {
      await addComment(blog.id, comment);
    } catch (err) {
      showNotification({
        message: "Error adding comment",
        type: "error",
      });
    }
  };

  return { blog, handleDeleteBlog, handleLikeBlog, handleAddComment };
};
