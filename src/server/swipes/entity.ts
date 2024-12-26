
export default interface Swipe {
    id: number;
    user_id: number;
    target_id: number;
    direction: 'dislike' | 'like';
    created_at: Date;
    updated_at: Date;
}