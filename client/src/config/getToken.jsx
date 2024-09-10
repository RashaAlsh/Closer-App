export const getToken = () => {
  const token = localStorage.getItem("token") || null;
  return token;
};
