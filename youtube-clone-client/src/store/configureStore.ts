import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './youtubeSlice';
import menuReducer from './menuSlice';

export const store = configureStore({
  reducer: { youtube: youtubeReducer, menu: menuReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
