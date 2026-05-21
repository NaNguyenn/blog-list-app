import { useState } from "react";
import { useNotificationActions } from "../store/notification";
import { useBlogActions } from "../store/blogs";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";
import { Box, Button, TextField } from "@mui/material";

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotificationActions();
  const { addBlog } = useBlogActions();
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("url");

  const handleAddBlog = async (blogObject) => {
    try {
      await addBlog(blogObject);
      showNotification({
        message: `A new blog titled ${blogObject.title} by ${blogObject.author} was added`,
        type: "success",
      });
    } catch (exception) {
      showNotification({
        message: "Error adding new blog",
        type: "error",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleAddBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });
    resetTitle();
    resetAuthor();
    resetUrl();
    navigate("/");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <TextField
            {...title}
            name="Title"
            data-testid="title-input"
            label="Title"
            variant="outlined"
          />
          <TextField
            {...author}
            name="Author"
            data-testid="author-input"
            label="Author"
            variant="outlined"
          />
          <TextField
            {...url}
            name="Url"
            data-testid="url-input"
            label="Url"
            variant="outlined"
          />
          <Button type="submit" variant="contained">
            create
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlogForm;
