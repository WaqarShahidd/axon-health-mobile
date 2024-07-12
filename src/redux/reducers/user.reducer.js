import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
};

const userReq = createAction("userByIdRequest");
const userSuccess = createAction("userByIdSuccess");
const userFail = createAction("userByIdFailure");

const clear = createAction("clearUserData");

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // User by Id
    .addCase(userReq, (state, action) => {
      state.loading = true;
    })
    .addCase(userSuccess, (state, action) => {
      state.loading = false;
      state.userData = action.payload.specificUser;
    })
    .addCase(userFail, (state, action) => {
      state.loading = false;
    })

    // Clear User Data
    .addCase(clear, (state, action) => {
      state.userData = null;
    });
});
