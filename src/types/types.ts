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

export interface Track {
    ID_Track: number;
    Track_Name: string;
    Track_Cover: string;
    Track_Audio: string;
    Genre_ID: number;
    User_ID: number;
    Alias: string;
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