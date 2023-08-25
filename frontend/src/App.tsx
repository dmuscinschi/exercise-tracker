import { FormEvent, useRef } from 'react';
import {
  createExerciseByUserId,
  createUser,
  getUserByUsername,
  getUserLogs,
  getUsers,
} from './api';

const prettifyPrint = (json: unknown) => {
  return JSON.stringify(json, undefined, 2);
};

function App() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const getUsernameRef = useRef<HTMLInputElement | null>(null);
  const userIdRef = useRef<HTMLInputElement | null>(null);
  const createExerciseUserIdRef = useRef<HTMLInputElement | null>(null);
  const durationRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textAreaRef = useRef<any>(null);

  const createUserHandler = (event: FormEvent) => {
    event.preventDefault();
    if (usernameRef.current) {
      createUser(usernameRef.current.value).then((resp) => {
        textAreaRef.current.value = prettifyPrint(resp);
      });
      usernameRef.current.value = '';
    }
  };

  const getUserByIdHandler = (event: FormEvent) => {
    event.preventDefault();
    if (getUsernameRef.current) {
      getUserByUsername(getUsernameRef.current.value).then((user) => {
        textAreaRef.current.value = prettifyPrint(user);
      });
      getUsernameRef.current.value = '';
    }
  };

  const getUserLogsHandler = (event: FormEvent) => {
    event.preventDefault();
    if (userIdRef.current) {
      getUserLogs(userIdRef.current.value).then((userLogs) => {
        textAreaRef.current.value = prettifyPrint(userLogs);
      });
      userIdRef.current.value = '';
    }
  };

  const createExerciseByUserIdHandler = (event: FormEvent) => {
    event.preventDefault();
    if (
      createExerciseUserIdRef.current &&
      durationRef.current &&
      descriptionRef.current &&
      dateRef.current
    ) {
      createExerciseByUserId(
        createExerciseUserIdRef.current.value,
        durationRef.current.value,
        descriptionRef.current.value,
        dateRef.current.value
      ).then((resp) => {
        textAreaRef.current.value = prettifyPrint(resp);
      });
      createExerciseUserIdRef.current.value = '';
      durationRef.current.value = '';
      descriptionRef.current.value = '';
      dateRef.current.value = '';
    }
  };

  const getUsersHandler = () => {
    getUsers().then((users) => {
      textAreaRef.current.value = prettifyPrint(users);
    });
  };

  return (
    <>
      Look what we have got here
      <form onSubmit={createUserHandler}>
        <input type="text" name="" id="" placeholder="username" ref={usernameRef} />
        <button type="submit">createUser</button>
      </form>
      <button onClick={getUsersHandler}>Get users</button>
      <form onSubmit={getUserByIdHandler}>
        <input type="text" name="" id="" placeholder="username" ref={getUsernameRef} />
        <button type="submit">Get user</button>
      </form>
      <form onSubmit={getUserLogsHandler}>
        <input type="text" name="" id="" placeholder="userid" ref={userIdRef} />
        <button type="submit">Get user logs by user id</button>
      </form>
      <form onSubmit={createExerciseByUserIdHandler}>
        <input type="text" name="" id="" placeholder="userid" ref={createExerciseUserIdRef} />
        <input type="text" name="" id="" placeholder="duration" ref={durationRef} />
        <input type="text" name="" id="" placeholder="description" ref={descriptionRef} />
        <input type="text" name="" id="" placeholder="date" ref={dateRef} />
        <button type="submit">Create exercise by user id</button>
      </form>
      <textarea name="" id="" cols={60} rows={30} ref={textAreaRef}></textarea>
    </>
  );
}

export default App;
