import { MaterialVM } from "@users/materials/data-access";
import { MaterialDTO } from "./material-dto.model";


type MaterialsDTOAdapter = {
  DTOtoVM(materialDTO: MaterialDTO): MaterialVM;
}

export const materialsDTOAdapter: MaterialsDTOAdapter = {
  DTOtoVM(materialDTO) {

    const fileType = specifyFileType(materialDTO.material_link)

    return {
      ...materialDTO,
      fileType
    }

    function specifyFileType(materialLink: string) {
      if(materialLink.endsWith('.pdf')) {
        return 'pdf'
      }
      if(materialLink.endsWith('.mp3')) {
        return 'audio'
      }
      return 'video'
    }
  },
}
