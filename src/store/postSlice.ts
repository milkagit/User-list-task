import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchPosts, updatePostData } from '../api/posts';

interface Post {
  id: number,
  title: string,
  body: string,
  userId: string
}
interface PospsState {
  posts: Post[];
  // posts: Record<number, Post>
  loading: boolean;
  error: string | null;
  editedPost: Post | null;
}

const initialState: PospsState = {
  posts: [],
  loading: false,
  error: null,
  editedPost: null,
};

// Thunk for fetching users
export const fetchPostThunk = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    try {
      const response = await fetchPosts(userId);
      // console.log('response', response) //correct response
      return response;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
);

export const updatePostThunk = createAsyncThunk(
  'users/updatePostData',
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

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setEditPost(state, action: PayloadAction<Post>) {
      // state.editedPost = action.payload
      state.editedPost = { ...initialState, ...action.payload }
    },
    clearEditPost(state) {
      state.editedPost = null
    },
    // setUpdatePost(state, action: PayloadAction<Post>) {
    //   state.posts[action.payload.id] = action.payload;
    //   state.editedPost = null;
    // },
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
        state.error = 'Failed to fetch users';
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
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to update post';
      });
  },

});

export const { setEditPost, clearEditPost, setUpdatePost } = postSlice.actions;

export default postSlice.reducer;
