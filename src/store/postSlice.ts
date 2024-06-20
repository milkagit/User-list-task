import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { deletePost, fetchPosts, updatePostData } from '../api/posts';

interface Post {
  id: number,
  title: string,
  body: string,
  userId: string
}
interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  editedPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  editedPost: null,
};

export const fetchPostThunk = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    try {
      const response = await fetchPosts(userId);
      return response;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
);

export const updatePostThunk = createAsyncThunk(
  'posts/updatePostData',
  async (post: Post) => {
    try {
      const response = await updatePostData(post);
      return response
    } catch (error) {
      console.error('Error updating post:', error);
      throw error
    }
  }
);

export const deletePostThunk = createAsyncThunk(
  'posts/deletePost',
  async (post: Post) => {
    try {
      const response = await deletePost(post);
      return response
    } catch (error) {
      console.error('Error updating post:', error);
      throw error
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setEditPost(state, action: PayloadAction<Post>) {
      state.editedPost = action.payload
    },
    clearEditPost(state) {
      state.editedPost = null
    },
    setUpdatePost(state, action: PayloadAction<Post>) {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.editedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostThunk.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch posts';
      })
      .addCase(updatePostThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        const updatedPost = action.payload;

        const index = state.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
        state.editedPost = null;
        state.loading = false;
      })
      .addCase(updatePostThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to update post';
      })
      .addCase(deletePostThunk.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deletePostThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete post';
      })
  },

});

export const { setEditPost, clearEditPost, setUpdatePost } = postSlice.actions;

export default postSlice.reducer;
