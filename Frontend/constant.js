import axios from "axios";

export const ApiClient =  axios.create({
  baseURL: "https://emailtemplatebuilderbackend.onrender.com/api/email-temp",
});
