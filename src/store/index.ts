import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import postsReducer from './postSlice';
import tasksReducer from './taskSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
