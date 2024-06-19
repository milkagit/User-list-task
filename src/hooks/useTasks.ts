import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { User } from "../api/users";
import { fetchTasksThunk } from '../store/taskSlice';

const useUsers = (userId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    // if (userId) {
    dispatch(fetchTasksThunk());
    // }
  }, []);

  return { tasks, loading, error };
};

export default useUsers;
