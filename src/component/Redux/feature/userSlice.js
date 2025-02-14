import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:{
        _id:'',
        role:"",
        Name:"",
        username:"",
        profilePicture:"",
    },
    isLoggedIn:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state, action)=>{
            state.isLoggedIn=true,
            state.user=action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        logout:(state,action)=>[
            state.isLoggedIn = false,
            state.user= {name:"",role:"",username:""},
            localStorage.removeItem('user')
        ]
    }
})
export const {login, logout} = userSlice.actions
export default userSlice.reducer