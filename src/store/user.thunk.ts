import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "api/user.api";
import { AxiosError } from "axios";
import { User } from "models/User";

export const loadUserThunk = createAsyncThunk("users/loadUsers", async () => {
  console.log("loading users");
  const response = await UserAPI.load();
  console.log(response);
  return response;
});

export const addUserThunk = createAsyncThunk<User, Partial<User>>(
  "users/addUser",
  async (user: Partial<User>) => {
    console.log("adding user");
    const response = await UserAPI.add(user);
    console.log(response);
    return response;
  }
);

interface EditUserPayload {
  id: number;
  user: Partial<User>;
}

export const editUserThunk = createAsyncThunk(
  "users/editUser",
  async (payload: EditUserPayload) => {
    console.log("editing user");
    try {
      const response = await UserAPI.edit(payload.id, payload.user);
      console.log(response);
      return response;
    } catch (e) {
      return payload.user;
    }
  }
);

export const deleteUserThunk = createAsyncThunk<void, number>(
  "users/deleteUser",
  async (id, thunkAPI) => {
    console.log("editing user");

    try {
      await UserAPI.delete(id);
    } catch (e) {
      console.log("user not in the server, just for testing");
    }
  }
);
