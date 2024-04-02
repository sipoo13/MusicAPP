import axios from "axios";
import { RegisterUser, AuthUser } from "../types/types";

const BASE_API_URL = 'http://localhost:3666';

axios.defaults.baseURL = BASE_API_URL;

export const register = async (userData: RegisterUser) => {
    const res = await axios.post('/registration', userData);
    return res;
}

export const auth = async (userData: AuthUser) => {
    const res = await axios.post('/login', userData);
    return res;
}

