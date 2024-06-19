import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTasksThunk } from '../store/taskSlice';

const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, []);

  return { tasks, loading, error };
};

export default useUsers;
