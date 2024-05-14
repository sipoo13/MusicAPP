import axios from "axios";
import { RegisterUser, AuthUser, User, Track, Deviation } from "../types/types";

const BASE_API_URL = 'http://localhost:3666';

axios.defaults.baseURL = BASE_API_URL;

export const get_genres = async () => {
    const res = await axios.get('/genres');
    return res;
}

export const get_users = async () => {
    const res = await axios.get('/users');
    return res;
}

export const get_tracks = async () => {
    const res = await axios.get('/tracks');
    return res;
}

export const get_deviation_tracks = async (id: string | undefined) => {
    const res = await axios.get(`/deviation_tracks/${id}`);
    return res;
}

export const get_tracks_with_favorite = async (id:number) => {
    const res = await axios.get(`/tracks_with_favorite/${id}`);
    return res;
}

export const get_moderated_tracks = async () => {
    const res = await axios.get('/moderated_tracks');
    return res;
}

export const deviation = async (deviationData: Deviation) => {
    const res = await axios.post('/deviation', deviationData);
    return res;
}

export const get_favorite_tracks = async (id: string | undefined) => {
    const res = await axios.get(`/favorite_tracks/${id}`);
    return res;
}

export const get_user = async (id: string | undefined) => {
    const res = await axios.get<User>(`/users/${id}`);
    return res;
}

export const get_user_tracks = async (id: string | undefined) => {
    const res = await axios.get<Track[]>(`/user_tracks/${id}`);
    return res;
}

export const register = async (userData: RegisterUser) => {
    const res = await axios.post('/registration', userData);
    return res;
}

export const auth = async (userData: AuthUser) => {
    const res = await axios.post('/login', userData);
    return res;
}

