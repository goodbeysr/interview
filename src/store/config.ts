import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user.slice";

const reducers = combineReducers({
  users: usersReducer
});

const store = configureStore({
  reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
