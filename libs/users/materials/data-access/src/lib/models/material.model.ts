export interface IMaterial {
    id: number;
    created_at: string;
    title: string;
    material_link: string;
    folder_id: number
}

export interface IAddMaterial {
    title: string;
    material_link: string;
    folder_id: number;
}