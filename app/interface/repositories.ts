export interface Repository {
    description: string;
    full_name: string;
    id: number;
    language: string;
    owner: {
        id: number;
    };
    stargazers_count: number;
    topics: string[];
    updated_at: string;
    url: string;
}
