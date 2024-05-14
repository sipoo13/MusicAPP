export interface RegisterUser {
    login: string;
    password: string;
    alias: string;
    roleId: number;
}

export interface AuthUser {
    login: string;
    password: string;
}

export interface User {
    ID_User: number;
    Avatar: string;
    Header: string;
    Login: string;
    Password: string;
    Salt: string;
    Alias: string;
    Role_ID: number;
}

export interface Deviation {
    reason: string;
    track_id: number;
}

export interface Track {
    ID_Track: number;
    Track_Name: string;
    Track_Cover: string;
    Track_Audio: string;
    Track_Duration: string;
    Genre_ID: number;
    Genre_Name: string;
    User_ID: number;
    Alias: string;
    ID_Favorite_Track: number;
    ID_User: number;
    Deviation_Reason: string;
}

export interface AuthUserInfo {
    id_user: number;
    roleId: number;
    token: string;
}

export type Playlist = Array<Track>;

export interface Genre {
    ID_Genre: string;
    Genre_Name: string;
}

export interface User {
    login: string;
    password: string;
    alias: string;
    header: string;
    avatar: string;
    roleId: number;
}

export interface AuthorizedUser {
    token: string;
    login: string;
    password: string;
    alias: string;
    header: string;
    avatar: string;
    roleId: number;
}