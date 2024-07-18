import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users:[],
  messages:[]
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addUsers: (state,action) => {
        const username = action.payload;
        console.log('username',username)
      state.users=[...state.users,username];
    },
    sendMessage:(state,action)=>{
        const message = action.payload;
        console.log('message',message);
        state.messages=[...state.messages,message]
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUsers,sendMessage } = userSlice.actions

export default userSlice.reducer