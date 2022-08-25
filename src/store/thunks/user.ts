import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/user';
import { ADD_USER, REMOVE_USER, UPDATE_USER } from '../slices/users';

const axiosInstance = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' });

export const fetchUsers = createAsyncThunk('USERS/FETCH', async () => {
  const res = await axiosInstance.get<User[]>('/users');

  if (res.status === 200) {
    return res.data;
  }

  return [];
});

export const createUser = createAsyncThunk<void, Record<string, string>>(
  'USERS/CREATE',
  async ({ address, ...data }, store) => {
    const res = await axiosInstance.post<User>('/users', {
      address: {
        city: address,
      },
      ...data,
    });

    if (res.status === 201) {
      store.dispatch(ADD_USER(res.data));
    }
  }
);

export const deleteUser = createAsyncThunk<void, number>(
  'USERS/DELETE',
  async (id, store) => {
    const res = await axiosInstance.delete<User>(`/users/${id}`);

    if (res.status === 200) {
      store.dispatch(REMOVE_USER(id));
    }
  }
);
export const updateUser = createAsyncThunk<void, number>(
  'USERS/UPDATE',
  async (id, store) => {
    const res = await axiosInstance.put<User>(`/users/${id}`);

    if (res.status === 200) {
      store.dispatch(UPDATE_USER(id));
    }
  }
);


