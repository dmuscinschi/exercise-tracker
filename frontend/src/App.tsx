import { FormEvent, useRef } from 'react';
import { createUser, getUserById, getUserLogs, getUsers } from './api';

function App() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const userIdRef = useRef<HTMLInputElement | null>(null);

  const createUserHandler = (event: FormEvent) => {
    event.preventDefault();
    if (usernameRef.current) {
      createUser(usernameRef.current.value);
      usernameRef.current.value = '';
    }
  };

  const getUserByIdHandler = (event: FormEvent) => {
    event.preventDefault();
    if (usernameRef.current) {
      getUserById(usernameRef.current.value);
      usernameRef.current.value = '';
    }
  };

  const getUserLogsHandler = (event: FormEvent) => {
    event.preventDefault();
    if (userIdRef.current) {
      getUserLogs(userIdRef.current.value);
      userIdRef.current.value = '';
    }
  };

  return (
    <>
      <h1>Open console to get results</h1>
      Look what we have got here
      <form onSubmit={createUserHandler}>
        <input type="text" name="" id="" placeholder="username" ref={usernameRef} />
        <button type="submit">createUser</button>
      </form>
      <button onClick={getUsers}>Get users</button>
      <form onSubmit={getUserByIdHandler}>
        <input type="text" name="" id="" placeholder="username" ref={usernameRef} />
        <button type="submit">Get user</button>
      </form>
      <form onSubmit={getUserLogsHandler}>
        <input type="text" name="" id="" placeholder="username" ref={userIdRef} />
        <button type="submit">Get user logs by user id</button>
      </form>
    </>
  );
}

export default App;
