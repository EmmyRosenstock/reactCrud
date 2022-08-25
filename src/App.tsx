import React, { FC, useEffect } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { useTypedDispatch } from './store';
import { fetchUsers } from './store/thunks/user';

const App: FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Simple CRUD App with React-Redux-TS</h1>
      <br />
      <br />
      <h4 className="info">Enter User Info</h4>
      <UserForm />
      <br />
      <UserList />
    </div>
  );
};

export default App;
