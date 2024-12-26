
export default interface Notification {
    id: number;
    user_id: number;
    message: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}