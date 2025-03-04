export interface IMaterial {
    id: number;
    create_at: Date;
    title: string;
    material_link: string;
    folder_id: number;
}

export interface IAddMaterial {
    title: string;
    material_link: string;
    folder_id: number;
}
