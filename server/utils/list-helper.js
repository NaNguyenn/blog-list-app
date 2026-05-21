const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((topBlog, currentBlog) => {
    return currentBlog?.likes > (topBlog?.likes || 0) ? currentBlog : topBlog;
  }, null);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorBlogCount = blogs.reduce((countMap, blog) => {
    countMap[blog.author] = (countMap[blog.author] || 0) + 1;
    return countMap;
  }, {});

  const topAuthor = Object.keys(authorBlogCount).reduce((top, author) => {
    return authorBlogCount[author] > (authorBlogCount[top] || 0) ? author : top;
  });

  return {
    author: topAuthor,
    blogs: authorBlogCount[topAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorLikes = blogs.reduce((likesMap, blog) => {
    likesMap[blog.author] = (likesMap[blog.author] || 0) + blog.likes;
    return likesMap;
  }, {});

  const topAuthor = Object.keys(authorLikes).reduce((top, author) => {
    return authorLikes[author] > (authorLikes[top] || 0) ? author : top;
  });

  return {
    author: topAuthor,
    likes: authorLikes[topAuthor],
  };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
