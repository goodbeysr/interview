import { AnyAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { User } from "models/User";
import { RootState } from "./config";
import {
  addUserThunk,
  deleteUserThunk,
  editUserThunk,
  loadUserThunk,
} from "./user.thunk";

interface IUserSlice {
  data: User[];
  loading: boolean;
}

const initialState: IUserSlice = {
  data: [],
  loading: false,
};

const isPendingAction = (action: AnyAction) => action.type.endsWith("/pending");
const isFulfilledAction = (action: AnyAction) =>
  action.type.endsWith("/fulfilled");
const isRejectedAction = (action: AnyAction) =>
  action.type.endsWith("/rejected");
const isRejectedOrFulfilledAction = (action: AnyAction) =>
  isFulfilledAction(action) || isRejectedAction(action);

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //load
      .addCase(loadUserThunk.pending, (state, action) => {
        state.data = [];
      })
      .addCase(loadUserThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(loadUserThunk.rejected, (state, action) => {
        state.data = [];
      })
      //add
      .addCase(addUserThunk.fulfilled, (state, action) => {
        const newId =
          state.data.length === 0
            ? 0
            : Math.max(...state.data.map((u) => u.id));
        state.data.push({
          ...action.payload,
          id: newId + 1,
        });
      })
      //edit
      .addCase(editUserThunk.fulfilled, (state, action) => {
        const user = state.data.find((u) => u.id === action.meta.arg.id);
        Object.assign(user, action.payload);
      })
      //delete
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.meta.arg);
      })
      //matchers for loading state
      .addMatcher(isPendingAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejectedOrFulfilledAction, (state) => {
        state.loading = false;
      });
  },
});

const rootSelector = (state: RootState) => state.users;

export const selectUsers = createSelector(rootSelector, (state) => state.data);
export const selectUser = (id: number) =>
  createSelector(rootSelector, (state) =>
    state.data.find((e: User) => e.id === id)
  );

export const selectLoading = createSelector(
  rootSelector,
  (state) => state.loading
);

export default UserSlice.reducer;
