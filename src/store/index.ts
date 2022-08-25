import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { usersSlice } from './slices/users';

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store['getState']>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTypedDispatch = () => useDispatch<typeof store['dispatch']>();
