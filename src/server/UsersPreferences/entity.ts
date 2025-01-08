
export default interface UserPreference {
    id?: number;
    user_id: number;
    role: string;
    location: string;
    search_range: number;
    latitude?: number;
    longitude?: number;
    number_rooms?: number;
    pets?: string;
    created_at?: Date;
}