import UserPreference from "./entity";

export default interface UserPreferenceRepository {
    create(userPreference: UserPreference): Promise<UserPreference>;
    getByUserId(userId: number): Promise<UserPreference>;
    update(userPreference: UserPreference): Promise<UserPreference>;
    delete(userId: number): Promise<boolean>;
}