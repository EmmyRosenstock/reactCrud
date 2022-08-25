import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../store';
import { deleteUser, updateUser } from '../store/thunks/user';
import { User } from '../types/user';

const UserList: React.FC = () => {
  const users = useTypedSelector((state) => state.users.users);
  const dispatch = useTypedDispatch();
  console.log(users);

  const handleDelete = (user: User) => {
    dispatch(deleteUser(user.id));
  };
  const handleUpdate =(user:User)=>{
    dispatch(updateUser(user.id))
    
  }

  return (
    <>
      {users.map((user) => {
        return (
          <div
            style={{ width: '50%', margin: '1rem auto', border: '1px solid black' }}
            key={user.id}
            className="user"
          >
            <p>Name:{user.name}</p>
            <p>E-mail: {user.email}</p>
            <p>Endereço: {user.address.city}</p>
            <p>Telefone: {user.phone}</p>
            <button onClick={() => handleDelete(user)}>Delete</button>
            <button onClick={() => handleUpdate(user)}>Update</button>
          </div>
        );
      })}
    </>
  );
};

export default UserList;
