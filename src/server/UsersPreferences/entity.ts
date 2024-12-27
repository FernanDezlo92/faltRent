
export default interface UserPreference {
    id?: number;
    user_id: number;
    role: string;
    location: string;
    search_range: number;
    created_at?: Date;
}