export interface Folder {
    id: number,
    created_at: string,
    title: string
}

export interface FolderCreate {
    title: string,
}