import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/users';
import { fetchUsers, postUpdateUserData } from '../api/users';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  editUser: number | null;
  fullView: boolean
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  editUser: null,
  fullView: false
};

// Thunk for fetching users
export const fetchUsersThunk = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsers();
    // console.log('response', response);
    //take the mandatory fields + name
    return response.map((user: User) => (
      {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        street: user.address.street,
        suite: user.address.suite,
      }))
  }
);

export const postUsersThunk = createAsyncThunk(
  'users/postUpdateUserData',
  async (user: User) => {
    const response = await postUpdateUserData(user);
    return response
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setEditUser(state, action) {
      state.editUser = action.payload
    },
    clearEditUser(state) {
      state.editUser = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsersThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      })
      .addCase(postUsersThunk.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
  },
});

export const { setEditUser, clearEditUser } = usersSlice.actions;

export default usersSlice.reducer;
