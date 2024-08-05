import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type authType = {
    isAuth: boolean;
    token: string | null;
    data: object;
}

const storedToken = sessionStorage.getItem("token")



const initialState: authType = {
    isAuth: !!storedToken,
    token: "",
    data: {}
    } 

    type LoginPayload = {
        token: string;
        data: object;
    };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
        reducers: {
            login: (state, action: PayloadAction<LoginPayload>) => {
                state.isAuth = true;
                state.token = action.payload.token;
                state.data = action.payload.data ;
                sessionStorage.setItem("token", action.payload.token)
            },
            logout: (state) => {
                state.isAuth = false;
                state.token = null
                state.data = {};
                sessionStorage.removeItem("token")
            },
            setAuth: (state, action: PayloadAction<boolean>) => {
                state.isAuth = action.payload
            }
        }
})

export const {login, logout, setAuth} = authSlice.actions;
export default authSlice.reducer;