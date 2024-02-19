export type typeFolderPostRequest = {
	title: string
}

export type typeMaterialPostRequest = {
	title: string,
	material_link: string,
}

export type typeFolderVM = {
	id: number,
	created_at: number,
	title: string
}

export type typeMaterial = {
	id: number,
	created_at: number,
	title: string,
	folder_id: number,
	material_link: string
}