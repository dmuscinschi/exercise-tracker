export const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
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

  const data = await response.json();
  console.log(data);
  return data;
};

export const getUserByUsername = async (username: string) => {
  if (username === '') {
    return { status: 'error', message: 'Username must not be empty' };
  }

  const response = await fetch(`http://localhost:3000/api/users/${username}`, {});
  const data = await response.json();

  return data;
};

export const getUserLogs = async (id: string = '') => {
  if (id === '') {
    return { status: 'error', message: 'User id must not be empty' };
  }

  const response = await fetch(`http://localhost:3000/api/users/${id}/logs`);
  const data = await response.json();

  return data;
};

export const createExerciseByUserId = async (
  userId: string = '',
  duration: string,
  description: string,
  date: string
) => {
  if (userId === '') {
    return { status: 'error', message: 'User id should not be empty' };
  }
  const response = await fetch(`http://localhost:3000/api/users/${userId}/exercises`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ userId, duration, description, date }),
  });

  const data = await response.json();

  return data;
};
