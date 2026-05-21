export const getUser = () => {
  return JSON.parse(window.localStorage.getItem("loggedUser"));
};

export const saveUser = (user) => {
  window.localStorage.setItem("loggedUser", JSON.stringify(user));
};

export const removeUser = () => {
  window.localStorage.removeItem("loggedUser");
};
