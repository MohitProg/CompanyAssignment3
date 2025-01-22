import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../../constant";




export const GetEmailtempdata=createAsyncThunk("getemailtemplates",async()=>{
    try {
        const  res=await ApiClient.get("/getEmailLayout");
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error)
        
    }
});


export const GetSingleEmailtempdata=createAsyncThunk("getsingleemail",async(emailid)=>{
    try {
        const  res=await ApiClient.get(`/getEmailLayout/${emailid}`);
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error)
        
    }
});