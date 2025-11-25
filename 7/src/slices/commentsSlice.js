import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// BEGIN (write your solution here)
const commentsAdapter = createEntityAdapter();

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState(),
  reducers: {
    addComment: commentsAdapter.addOne,
    addComments: commentsAdapter.addMany,
  },
});

// Экспорт экшнов
export const { actions } = commentsSlice;

// Экспорт селекторов
export const selectors = commentsAdapter.getSelectors((state) => state.comments);

export default commentsSlice.reducer;

// END
