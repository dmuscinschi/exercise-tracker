import { fetchData, getUserById, getUsers } from './api';

function App() {
  return (
    <>
      Look what we have got here
      <div></div>
      <button onClick={fetchData}>some data</button>
      <button onClick={getUsers}>Get users</button>
      <button onClick={getUserById}>Get user by id (1 by default)</button>
    </>
  );
}

export default App;
