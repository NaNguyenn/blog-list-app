import { useState, useEffect, useRef } from "react";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";
import BlogDetail from "./components/BlogDetail";
import blogService from "./services/blogs";
import { setAuthToken } from "./services/api";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggleable from "./components/Toggleable";
import ErrorBoundary from "./components/ErrorBoundary";
import BlogList from "./components/BlogList";
import { useUser, useUserActions } from "./store/user";
import { getUser, removeUser } from "./services/persistentUser";
import { UserList } from "./components/UserList";
import { UserDetail } from "./components/UserDetail";

const App = () => {
  const user = useUser();
  const { setUser } = useUserActions();
  const blogFormRef = useRef();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
      setAuthToken(user.token);
    }
  }, [setUser]);

  const handleLogout = () => {
    removeUser();
    setUser(null);
    setAuthToken(null);
  };

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/create">
                  new blog
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <BlogList />
              </ErrorBoundary>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ErrorBoundary>
                <BlogDetail />
              </ErrorBoundary>
            }
          />
          <Route
            path="/create"
            element={
              <ErrorBoundary>
                <CreateBlogForm />
              </ErrorBoundary>
            }
          />
          <Route
            path="/login"
            element={
              <ErrorBoundary>
                <LoginForm />
              </ErrorBoundary>
            }
          />
          <Route
            path="/users"
            element={
              <ErrorBoundary>
                <UserList />
              </ErrorBoundary>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ErrorBoundary>
                <UserDetail />
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
