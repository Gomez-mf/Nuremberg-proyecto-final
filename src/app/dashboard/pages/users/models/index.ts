export interface users{
    id: number;
    name: string;
    lastname: string;
    email: string;
    token: string;
    password: string;
    role: 'Admin' | 'Student'
}