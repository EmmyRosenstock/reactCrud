import React, { FormEventHandler, useState } from 'react';
import { useTypedDispatch } from '../store';
import { createUser } from '../store/thunks/user';
import { User } from '../types/user';
import Input from './Input';

type FormState = Record<keyof User, string>;

const UserForm: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    address: '',
    phone: '',
    id: '',
    company: '',
    website: '',
    username: '',
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // Avoid page reload
    dispatch(createUser(form));
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
      <button type="submit">Add</button>
    </form>
  );
};

export default UserForm;
