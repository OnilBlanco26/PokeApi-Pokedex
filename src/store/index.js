import { configureStore } from "@reduxjs/toolkit";
import trainerSlice from "./slices/trainer.slice";


export default configureStore({
    reducer: {
        // Add your reducers here
        trainer: trainerSlice
    }
});

