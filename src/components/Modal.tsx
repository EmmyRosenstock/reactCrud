import React, { FormEventHandler, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../store";
import { updateUser } from "../store/thunks/user";
import { User } from "../types/user";
import Input from "./Input";

type FormState = Record<keyof User, string>;

const UserModal: React.FC = () => {
  const users = useTypedSelector((state) => state.users.users);
  const userId = useTypedSelector((state) => state.users.user_editabled);
  const dispatch = useTypedDispatch();

  const filteredUser = users.filter((user) => user.id === userId);
  console.log(filteredUser);

  const [form, setForm] = useState<FormState>({
    name: filteredUser[0]?.name,
    email: filteredUser[0]?.email,
    address: "",
    phone: filteredUser[0]?.phone,
    id: String(filteredUser[0]?.id),
    company: "",
    website: "",
    username: filteredUser[0]?.username,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // Avoid page reload
    dispatch(updateUser(form));
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        label="name"
        onChange={(e) => handleFieldChange("name", e.target.value)}
        defaultValue={filteredUser[0]?.name}
      />
      <Input
        type="email"
        label="email"
        onChange={(e) => handleFieldChange("email", e.target.value)}
        defaultValue={filteredUser[0]?.email}
      />
      <Input
        type="tel"
        label="phone"
        onChange={(e) => handleFieldChange("phone", e.target.value)}
        defaultValue={filteredUser[0]?.phone}
      />
      <Input
        type="text"
        label="username"
        onChange={(e) => handleFieldChange("username", e.target.value)}
        defaultValue={filteredUser[0]?.username}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UserModal;
