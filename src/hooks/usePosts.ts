import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchPostThunk } from '../store/postSlice';

const usePosts = (userId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPostThunk(userId));
    }
  }, [userId]);

  return { posts, loading, error };
};

export default usePosts;
