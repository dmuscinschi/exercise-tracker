export const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  return data;
};

export const createUser = async (username: string) => {
  const dataCheck = {
    username,
  };
  await fetch('http://localhost:3000/api/user/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(dataCheck),
  });
  return { message: 'success' };
};

export const getUserByUsername = async (username: string) => {
  const response = await fetch(`http://localhost:3000/api/users/${username}`, {});
  const data = await response.json();
  return data;
};

export const getUserLogs = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}/logs`);
  const data = await response.json();
  return data;
};

export const createExerciseByUserId = async (
  userId: string,
  duration: string,
  description: string,
  date: string
) => {
  await fetch(`http://localhost:3000/api/users/${userId}/exercises`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ userId, duration, description, date }),
  });

  return { message: 'success' };
};
