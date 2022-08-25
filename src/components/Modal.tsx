import React, { FormEventHandler, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../store';
import { updateUser} from '../store/thunks/user';
import { User } from '../types/user';
import Input from './Input';

type FormState = Record<keyof User, string>;

const ModalUser = () =>  {
  const users = useTypedSelector((state) => state.users.users);

  console.log(users); 
  const dispatch = useTypedDispatch();
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
  return (
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
      <button type="submit" onClick={()=>handleUpdate}>Editar</button>
    
    </form>
  );
};

export default ModalUser;
