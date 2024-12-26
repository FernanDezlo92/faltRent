
export default interface Property {
    id: number;
    user_id: number;
    address: string;
    city: string;
    state: string;
    zip: string;
    price: number;
    description: string;
    created_at: Date;
    updated_at: Date;
}