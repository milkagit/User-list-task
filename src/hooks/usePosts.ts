import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { clearEditPost, fetchPostThunk, updatePostThunk } from '../store/postSlice';
import { Post } from '../api/posts';

const usePosts = (userId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);
  // const editPost = useSelector((state: RootState) => state.posts.editedPost)

  useEffect(() => {
    if (userId) {
      dispatch(fetchPostThunk(userId));
    }
  }, []);

  // console.log('posts in posts', posts) //array of all posts - correct


  const updatePost = (post: Post) => {
    dispatch(updatePostThunk(post));
  };


  return { posts, loading, error, updatePost };
};

export default usePosts;
