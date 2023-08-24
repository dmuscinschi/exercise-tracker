export const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  console.log(data);
  return data;
};

export const createUser = async (username: string) => {
  const dataCheck = {
    username,
  };
  const response = await fetch('http://localhost:3000/api/user/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(dataCheck),
  });
  console.log('RESPONSE_POST', await response.json());
  return { message: 'success' };
};

export const getUserById = async (username: string) => {
  const response = await fetch(`http://localhost:3000/api/users/${username}`, {});

  const data = await response.json();
  console.log(data);
  return data;
};

export const getUserLogs = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}/logs`);
  const data = await response.json();
  console.log(data);
  return data;
};
