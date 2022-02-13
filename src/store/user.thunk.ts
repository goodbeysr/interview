import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "api/user.api";
import { User } from "models/User";

export const loadUserThunk = createAsyncThunk(
  "users/loadUsers",
  async (thunkAPI) => {
    console.log("loading users");
    const response = await UserAPI.load();
    console.log(response);
    return response;
  }
);

export const addUserThunk = createAsyncThunk<User, Partial<User>>(
  "users/addUser",
  async (user: Partial<User>, thunkAPI) => {
    console.log("adding user");
    const response = await UserAPI.add(user);
    console.log(response);
    return response;
  }
);

export const editUserThunk = createAsyncThunk<
  User,
  { id: number; user: Partial<User> }
>("users/editUser", async (payload, thunkAPI) => {
  console.log("editing user");
  const response = await UserAPI.edit(payload.id, payload.user);
  console.log(response);
  return response;
});

export const deleteUserThunk = createAsyncThunk<void, number>(
  "users/deleteUser",
  async (id, thunkAPI) => {
    console.log("editing user");
    await UserAPI.delete(id);
  }
);
