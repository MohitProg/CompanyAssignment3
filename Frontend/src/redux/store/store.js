import {configureStore} from "@reduxjs/toolkit"
import EmailReducer from "../slice/EmailSlice.js"

export const store=configureStore({
    reducer:{
        template:EmailReducer,
       
        
    }
})