import axios from "../utils/axios";

export const test = async () => {
  // setTimeout(async () =>{
  // }, 3000)
  const result = await axios.get(`/`);
  return result.data;
};

export const signUp = async ({ email, role }) => {
  const result = await axios.post("/auth/signup", {
    email: email,
    role: role,
  });
  return result.data;
};

export const signIn = async ({ email, password }) => {
  const result = await axios.post("/auth/login", {
    email: email,
    password: password,
  });
  return result.data;
};

export const forgotPass = async ({ email }) => {
  const result = await axios.post("/auth/forgotPass", {
    email,
  });
  return result.data;
};

export const changePass = async ({ email, currentPass, newPass }) => {
  const result = await axios.post("/auth/forgotPass", {
    email,
    currentPass,
    newPass,
  });
  return result.data;
};
