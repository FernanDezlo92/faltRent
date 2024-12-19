import User from "./entity";


export default interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
    getById(id: number): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: number): Promise<boolean>;
    getAll(): Promise<User[]>;
}