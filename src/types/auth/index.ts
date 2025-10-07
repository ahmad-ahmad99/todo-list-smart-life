

export type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | 'other';
    image: string;
    accessToken: string;
    refreshToken: string;

};

export type UserType = User | null;

export type AuthState = {
    user: UserType;
    loading: boolean;
};

export type AuthContextValue = {
    user: UserType;
    loading: boolean;
    authenticated: boolean;
    unauthenticated: boolean;
    checkUserSession?: () => Promise<void>;
};
