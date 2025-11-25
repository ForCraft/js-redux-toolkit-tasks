import axios from "axios";

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import routes from "../routes.js";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(routes.tasksPath());
  return response.data.items;
});

// BEGIN (write your solution here)
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (name) => {
    const response = await axios.post(routes.tasksPath(), { name });
    return response.data;
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id) => {
    await axios.delete(routes.taskPath(id));
    return id;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;

// END
