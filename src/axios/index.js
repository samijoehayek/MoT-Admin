import axios from "axios";

// Users
export const getAllUsers = async (filter, skip, take, search) => {
  const users = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/users`, {
    params: { filter: filter, skip: skip, take: take, search: search },
  });
  return users.data;
};

export const getUserByJWT = async (token, filter) => {
  const user = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/users/GetUserById`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      filter,
    },
  });

  return user.data;
};

export const getUserCount = async (token) => {
  const userCount = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/users/GetUserCount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return userCount.data;
};

export const adminCreate = async (newUser, token) => {
  console.log(newUser);
  const user = await axios.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/adminCreate`,
    {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      roleId: newUser.roleId,
      isVerified: newUser.isVerified,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return user;
};

// Roles
export const getAllRoles = async (filter, skip, take, search) => {
  const roles = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/role`, {
    params: { filter: filter, skip: skip, take: take, search: search },
  });

  return roles.data;
};

export const createRole = async (role) => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/role`, role, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const updateRole = async (role, id) => {
  await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/role/${id}`, role, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const deleteRole = async (role, id) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/role/${id}`, role, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

// Manager
export const toggleUserLogin = async (isActive, userId) => {
  await axios.put(
    `${process.env.NEXT_PUBLIC_API_HOST}/manager/toggleUserLogIn/${isActive}/${userId}`,
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
};

// Content
export const getAllContent = async (filter, skip, take, search) => {
  await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/content`, {
    params: { filter: filter, skip: skip, take: take, search: search },
  });
};

export const createContent = async (content) => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/content`, content, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const updateContent = async (content, id) => {
  await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/content/${id}`, content, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const deleteContent = async (content, id) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/content/${id}`, content, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

// auth
export const login = async (username, password) => {
  const user = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/adminLogin`, {
    username: username,
    password: password,
  });

  return user.data;
};
