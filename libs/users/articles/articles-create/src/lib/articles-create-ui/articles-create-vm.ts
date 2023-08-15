import { Article } from "@users/users/articles/data-access"

export type ArticlesCreateVm = {
  isDarkTheme: boolean,
  editMode: boolean
  editingArticle: Article | null
}
