import { DeepReadonly } from "@users/core/utils"

export type CreateFolderDTO = DeepReadonly<{
  "title": "string"
}>

export type FolderDTO = DeepReadonly<{
    "id": 0,
    "created_at": "now",
    "title": "string",
    "material_link": "string",
    "folder_id": 0
  }>

export type CreateMaterialsDTO = DeepReadonly<{
    "title": "string",
    "material_link": "string",
    "folder_id": 0
  }>

export type MaterialsDTO = DeepReadonly<{
    "id": 0,
    "created_at": "now",
    "title": "string",
    "material_link": "string",
    "folder_id": 0
  }>

