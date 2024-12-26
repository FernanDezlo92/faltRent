import Swipe from "./entity";

export default interface SwipeRepository {
    create(swipe: Swipe): Promise<Swipe>;
    getAll(): Promise<Swipe[]>;
    getByUserId(userId: number): Promise<Swipe[]>;
    getByUserIdAndSwipeeId(userId: number, swipeeId: number): Promise<Swipe | null>;
    update(swipe: Swipe): Promise<Swipe>;
    delete(id: number): Promise<boolean>;
}