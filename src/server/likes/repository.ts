import Like from "./entity";

export default interface LikeRepository {
    create(like: Like): Promise<Like>;
    getAll(): Promise<Like[]>;
    getByUserId(userId: number): Promise<Like[]>;
    getByUserIdAndPropertyId(userId: number, propertyId: number): Promise<Like | null>;
    update(like: Like): Promise<Like>;
    delete(id: number): Promise<boolean>;
}