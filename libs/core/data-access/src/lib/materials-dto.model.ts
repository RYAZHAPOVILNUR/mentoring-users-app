export type CreateMaterialDTO = {
    title: string;
    material_link: string;
    folder_id?: number;
};

export type MaterialType = {
    id: number;
    created_at: string;
    title: string;
    material_link: string;
    folder_id: number;
};


export enum MaterialFileType {
    video = 'видео',
    podcast = 'mp3',
    pdf = 'pdf'
}
