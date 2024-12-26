import Property from "./entity";

export default interface PropertyRepository {
    create(property: Property): Promise<Property>;
    getAll(): Promise<Property[]>;
    getByUserId(userId: number): Promise<Property[]>;
    getById(id: number): Promise<Property | null>;
    update(property: Property): Promise<Property>;
    delete(id: number): Promise<boolean>;
}