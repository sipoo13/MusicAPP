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