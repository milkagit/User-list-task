import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const fetchUsersThunk = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsers();
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
      .addCase(postUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUsersThunk.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(postUsersThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      })
  },
});

export const { setEditUser, clearEditUser } = usersSlice.actions;

export default usersSlice.reducer;
