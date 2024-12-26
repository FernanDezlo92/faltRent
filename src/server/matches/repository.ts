import Match from "./entity";

export default interface MatchRepository {
    create(match: Match): Promise<Match>;
    getAll(): Promise<Match[]>;
    getByUserId(userId: number): Promise<Match[]>;
    getById(id: number): Promise<Match | null>;
    update(match: Match): Promise<Match>;
    delete(id: number): Promise<boolean>;
}