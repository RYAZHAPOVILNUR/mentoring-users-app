export type FolderPostRequest = {
	title: string
}

export type MaterialPostRequest = {
	title: string,
	material_link: string,
}

export type FolderVM = {
	id: number,
	created_at: number,
	title: string
}

export type Material = {
	id: number,
	created_at: number,
	title: string,
	folder_id: number,
	material_link: string
}