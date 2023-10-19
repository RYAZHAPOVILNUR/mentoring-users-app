import { Article } from "@users/users/articles/data-access"

export type ArticlesCreateVm = {
  editMode: boolean
  editingArticle: Article | null
}
