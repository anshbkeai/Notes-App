import { createSlice } from "@reduxjs/toolkit";

const initailState = {
    userdata : null,
    isAuthenticated : false,
    token:null
}

const authSlice = createSlice({
    name:"auth",
    initialState:initailState,
    reducers : {
        login: (state,action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userdata = action.payload.userdata;
        },
        logout : (state) => {
            state.userdata = null;
            state.isAuthenticated = false; 
            state.token = null;
        }
    }
})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;