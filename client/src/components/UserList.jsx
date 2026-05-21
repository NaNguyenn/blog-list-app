import { useState, useEffect, useRef } from "react";

import Blog from "./Blog";
import CreateBlogForm from "./CreateBlogForm";
import Toggleable from "./Toggleable";
import { useUser } from "../store/user";
import { useUsers, useUsersActions } from "../store/users";
import { Link, useNavigate } from "react-router-dom";

export const UserList = () => {
  const user = useUser();
  const { initializeUsers } = useUsersActions();
  const users = useUsers();

  useEffect(() => {
    if (user && !users?.length) {
      initializeUsers();
    }
  }, [initializeUsers, users?.length, user]);

  return (
    <>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.username}</td>
              <td>{user.blogs?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
