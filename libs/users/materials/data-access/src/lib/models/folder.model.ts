export interface IFolder {
    id: number;
    created_at: string;
    title: string;
}

export type IAddFolder = {
    title: string
}