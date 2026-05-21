import { useEffect } from "react";
import "../index.css";
import { useNotification } from "../store/notification";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useNotification();
  if (notification === null) {
    return null;
  }

  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={notification.type}
    >
      {notification.message}
    </Alert>
  );
};

export default Notification;
