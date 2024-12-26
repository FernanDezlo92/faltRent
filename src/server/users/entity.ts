
export default interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    status: string;
    photo?: string;
    admin?: boolean;
    type?: string;
    created_at?: Date;
    updated_at?: Date;
}