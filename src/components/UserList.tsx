import React, { FormEventHandler, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../store';
import { deleteUser, updateUser } from '../store/thunks/user';
import { User } from '../types/user';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Input from './Input';

type FormState = Record<keyof User, string>;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const UserList= () => {
 

const [open, setOpen]= useState(false)
const handleOpen = ()=> setOpen(true)
const handleClose =()=>setOpen(false)
  
  const users = useTypedSelector((state) => state.users.users);
  const dispatch = useTypedDispatch();
  console.log(users);
  const [form, setForm] = useState<User>({} as User)
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(updateUser(form));
  };
  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdate =(user:User)=>{
    dispatch(updateUser(user))
    
  }

  const handleDelete = (user: User) => {
    dispatch(deleteUser(user.id));
  };


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
            <button onClick={handleOpen}>Update</button>
         
            <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>

         <form onSubmit={handleSubmit}>
      <Input
        type="text"
        label="name"
        onChange={(e) => handleFieldChange('name', e.target.value)}
      />
      <Input
        type="email"
        label="email"
        onChange={(e) => handleFieldChange('email', e.target.value)}
      />
      <Input
        type="tel"
        label="phone"
        onChange={(e) => handleFieldChange('phone', e.target.value)}
      />
      <Input
        type="text"
        label="username"
        onChange={(e) => handleFieldChange('username', e.target.value)}
      />
      <button type="submit" onClick={()=>handleUpdate(user)}>Editar</button>
    
    </form>
        </Box>
             
      </Modal>
          </div>
        );
      })}
    </>
  );
};

export default UserList;
