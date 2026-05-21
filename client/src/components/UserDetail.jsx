import { useParams } from "react-router-dom";
import { useUsers } from "../store/users";

export const UserDetail = () => {
  const id = useParams().id;
  const users = useUsers();
  const user = users.find((u) => u.id === id);

  return (
    <>
      <div>{user.name}</div>
      <div>
        <p>
          added blogs
          <ul>
            {user.blogs?.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </p>
      </div>
    </>
  );
};
