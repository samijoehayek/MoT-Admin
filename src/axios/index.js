import axios from "axios";

// Users
export const getAllUsers = async (token, filter, skip, take, search) => {
  const users = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const searchUserByName = async (token, search) => {
  const users = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/users/searchUserByName`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { search: search },
  });
  return users.data;
};

export const getUserCount = async (token) => {
  const userCount = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/users/GetUserCount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return userCount.data;
};

// Admin
export const adminCreate = async (newUser, token) => {
  const user = await axios.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/adminCreate`,
    {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      roleId: newUser.roleId,
      tag: newUser.tag,
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

export const avatarCreate = async (newAvatar, token) => {
  const avatar = await axios.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/avatar`,
    {
      name: newAvatar.name,
      gender: newAvatar.gender,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return avatar;
};

export const changeActivity = async (isActive, userId, token) => {
  const toggleUserActivity = await axios.put(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/updateUserActivity/${userId}/${isActive}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return toggleUserActivity;
};

export const updateUserTag = async (userId, tag, token) => {
  const changeUserTag = await axios.put(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/updateUserTag/${userId}`,
    {tag: tag},
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return changeUserTag;
}

export const updateUserBalance = async (userId, balance, token) => {
  const changeUserBalance = await axios.put(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/updateUserBalance/${userId}`,
    {balance: balance},
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return changeUserBalance;
}

export const updateUserRole = async (userId, roleId, token) => {
  const changeUserRole = await axios.put(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/updateUserRole/${userId}`,
    {roleId: roleId},
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return changeUserRole;
}

// Avatar
export const getAllAvatars = async (token, filter, skip, take, search) => {
  const avatars = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/avatar`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { filter: filter, skip: skip, take: take, search: search },
  });
  return avatars.data;
};

export const searchAvatarByName = async (token, search) => {
  const avatars = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/avatar/searchAvatarByName`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { search: search },
  });
  return avatars.data;
};

// Roles
export const getAllRoles = async (token, filter, skip, take, search) => {
  const roles = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/role`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { filter: filter, skip: skip, take: take, search: search },
  });

  return roles.data;
};

export const createRole = async (role, token) => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/role`, role, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRole = async (role, id, token) => {
  await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/role/${id}`, role, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteRole = async (role, id, token) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/role/${id}`, role, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Content
export const getAllContent = async (token, filter, skip, take, search) => {
  await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/content`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { filter: filter, skip: skip, take: take, search: search },
  });
};

export const createContent = async (content, token) => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/content`, content, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
};

export const updateContent = async (content, id, token) => {
  await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/content/${id}`, content, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
};

export const deleteContent = async (content, id, token) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/content/${id}`, content, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
};

// Collectable
export const getAllCollectables = async (token, filter, skip, take, search) => {
  const collectables = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/collectable`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { filter: filter, skip: skip, take: take, search: search },
  });
  return collectables.data;
};

export const collectableCreate = async (token, newCollectable) => {
  const collectable = await axios.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/collectable`,
    {
      name: newCollectable.name,
      description: newCollectable.description,
      value: newCollectable.value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return collectable;
};

export const searchCollectableByName = async (token, search) => {
  const collectable = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/collectable/searchCollectableByName`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { search: search },
    }
  );
  return collectable.data;
};

// auth
export const login = async (username, password) => {
  const user = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/adminLogin`, {
    username: username,
    password: password,
  });

  return user.data;
};

export const changePassword = async (password, token) => {
  const user = await axios.put(
    `${process.env.NEXT_PUBLIC_API_HOST}/auth/changePassword`,
    {
      oldPassword: password.oldPassword,
      newPassword: password.newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return user.data;
};

export const userIsAdmin = async (token) => {
  const user = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/auth/userIsAdmin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return user.data;
}
