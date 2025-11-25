import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { actions as usersActions } from "./usersSlice.js";
import { actions as postsActions } from "./postsSlice.js";

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComments: commentsAdapter.addMany,
    addComment: commentsAdapter.addOne,
  },
  // BEGIN (write your solution here)
  extraReducers: (builder) => {
    builder
      .addCase(usersActions.removeUser, (state, action) => {
        
        const userId = action.payload;
        const remaining = Object.values(state.entities).filter(
          (comment) => comment && comment.author !== userId
        );
        commentsAdapter.setAll(state, remaining);
      })
      .addCase(postsActions.removePost, (state, action) => {
        const post = action.payload;
        const commentIdsToRemove = new Set(post.comments || []);
        const remaining = Object.values(state.entities).filter(
          (comment) => comment && !commentIdsToRemove.has(comment.id)
        );
        commentsAdapter.setAll(state, remaining);
      });
  },

  // END
});

export const { actions } = commentsSlice;
export const selectors = commentsAdapter.getSelectors(
  (state) => state.comments
);
export default commentsSlice.reducer;
