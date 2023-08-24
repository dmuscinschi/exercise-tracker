export const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users');

  console.log('Response', response);
  const data = await response.json();
  console.log('Data', data);
  return data;
};

export const fetchData = async () => {
  console.log('Is it working?');

  const dataCheck = {
    user: 'hello',
    name: 'John',
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

export const getUserById = async () => {
  const id = 1;
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {});

  console.log('getUserById', response);
  const data = await response.json();
  console.log('Data', data);
  return data;
};
