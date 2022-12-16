import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plans: []
};

const planSlice = createSlice({
    name: 'planSlice',
    initialState,
    reducers: {
        getPlansSuccess(state, action) {
            state.plans = action.payload
        },
    }
  })
  
export default planSlice;