import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { fetchUsers } from '../thunks/user';

type UserState = {
  users: User[];
  loading: boolean;
  error: boolean;
};

const initialState: UserState = {
  users: [],
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
    UPDATE_USER(state, action: PayloadAction<number>) {
      let user = state.users.filter((user) => user.id === action.payload)[0]
     state.users = [...state.users.filter((user) => user.id !== action.payload), user]
      console.log(user.name)
    },
    REMOVE_USER(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { ADD_USER, REMOVE_USER, UPDATE_USER } = usersSlice.actions;
