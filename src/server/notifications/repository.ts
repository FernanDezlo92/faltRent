import Notification from "./entity";

export default interface NotificationRepository {
    create(notification: Notification): Promise<Notification>;
    getAll(): Promise<Notification[]>;
    getByUserId(userId: number): Promise<Notification[]>;
    getById(id: number): Promise<Notification | null>;
    update(notification: Notification): Promise<Notification>;
    delete(id: number): Promise<boolean>;
}