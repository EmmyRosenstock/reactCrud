import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { fetchUsers } from '../thunks/user';

type UserState = {
  users: User[];
  user_editabled: number;
  loading: boolean;
  error: boolean;
};

const initialState: UserState = {
  users: [],
  user_editabled: 0,
  loading: false,
  error: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    ADD_USER(state, action: PayloadAction<User>) {
      state.users = [action.payload, ...state.users];
    },
    UPDATE_USER(state, action: PayloadAction<User>) {
      state.user_editabled = 0;
      const filteredUser = state.users.filter((user) => user.id != action.payload.id)
      state.users = [...filteredUser, action.payload]
      console.log("state", current(state))
    },
    REMOVE_USER(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    SET_USER_ID(state, action: PayloadAction<number>) {
      state.user_editabled = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.user_editabled = 0;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = false;
      state.user_editabled = 0;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { ADD_USER, REMOVE_USER, UPDATE_USER, SET_USER_ID } = usersSlice.actions;