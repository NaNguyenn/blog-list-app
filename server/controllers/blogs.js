const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

// get all blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

// add new blog
blogsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;

    const user = await User.findById(request.user.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    try {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();

      response.status(201).json(savedBlog);
    } catch (error) {
      next(error);
    }
  },
);

// delete a blog
blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const id = request.params.id;

    try {
      const user = await User.findById(request.user.id);
      const blog = await Blog.findById(id);
      if (!blog) {
        return response.status(204).end();
      }

      if (blog.user.toString() !== user._id.toString()) {
        return response
          .status(403)
          .json({ error: "You are not authorized to delete this blog" });
      }
      await Blog.findByIdAndDelete(id);

      user.blogs = user.blogs.filter(
        (blogId) => blogId.toString() !== id.toString(),
      );
      await user.save();

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

// update a blog
blogsRouter.put(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;

    try {
      const blog = await Blog.findById(request.params.id);

      if (!blog) {
        return response.status(404).json({ error: "Blog not found" });
      }

      const updatedBlogData = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: blog.user,
      };

      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        updatedBlogData,
        {
          returnDocument: "after",
          runValidators: true,
          context: "query",
        },
      );

      response.json(updatedBlog);
    } catch (error) {
      next(error);
    }
  },
);

blogsRouter.post("/:id/comments", async (request, response, next) => {
  const { comment } = request.body;

  if (!comment) {
    return response.status(400).json({ error: "comment is required" });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $push: { comments: comment } },
      {
        returnDocument: "after",
        runValidators: true,
        context: "query",
      },
    );

    if (!updatedBlog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    response.status(201).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
