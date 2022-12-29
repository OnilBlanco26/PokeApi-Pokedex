import { createSlice } from "@reduxjs/toolkit";


const trainerSlice = createSlice({
    name: "trainer",
    initialState: '',
    reducers: {
        setTrainerGlobal: (state, action) => {
            return action.payload;
        }
    }
})

export const { setTrainerGlobal } = trainerSlice.actions;
export default trainerSlice.reducer;