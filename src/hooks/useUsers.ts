import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchUsersThunk, postUsersThunk } from '../store/userSlice';
import { User } from "../api/users";

const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsersThunk());
    }
  }, [dispatch, users.length]);

  const updateUser = (user: User) => {
    dispatch(postUsersThunk(user));
  }


  return { users, loading, error, updateUser };
};

export default useUsers;
