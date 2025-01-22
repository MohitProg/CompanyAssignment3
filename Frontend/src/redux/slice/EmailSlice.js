import { createSlice } from "@reduxjs/toolkit";
import { GetEmailtempdata, GetSingleEmailtempdata } from "./EmailApi";

const initialState = {
  emailtempdata: [],
  snglemailtempdata: "",
  getemailtempstatus: "idle",
  getsnglemailstempstatus: "idle",
};

const EmailSlice = createSlice({
  name: "emailtemplate",
  initialState,
  reducers: () => {},

  extraReducers: (builder) => {
    // get all email data
    builder
      .addCase(GetEmailtempdata.pending, (state, action) => {
        state.getemailtempstatus = "pending";
      })
      .addCase(GetEmailtempdata.fulfilled, (state, action) => {
        state.emailtempdata = action.payload?.Emaildata;
        state.getemailtempstatus = "fullfilled";
      })
      .addCase(GetEmailtempdata.rejected, (state, action) => {
        state.getemailtempstatus = "rejected";
      });

    // get single email data

    builder
      .addCase(GetSingleEmailtempdata.pending, (state, action) => {
        state.getsnglemailstempstatus = "pending";
      })
      .addCase(GetSingleEmailtempdata.fulfilled, (state, action) => {
        state.snglemailtempdata = action.payload?.singleemaildata;
        state.getsnglemailstempstatus = "fullfilled";
      })
      .addCase(GetSingleEmailtempdata.rejected, (state, action) => {
        state.getsnglemailstempstatus = "rejected";
      });
  },
});

export default EmailSlice.reducer;
