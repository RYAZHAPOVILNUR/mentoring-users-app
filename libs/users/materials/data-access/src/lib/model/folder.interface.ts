export interface Folder {
    id: number;
    created_at: number;
    title: string
}

export interface createdFolder {
    title: string;
}

export interface Material {
    id: number;
    created_at: number;
    title: string;
    material_link: string;
    folder_id: number
}

export interface createdMaterial {
    title: string;
    material_link: string;
    folder_id: number
}