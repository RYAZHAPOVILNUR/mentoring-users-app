import { MaterialType } from "@users/users/materials/data-access";

export const getMaterialType = (link: string): MaterialType | null => {
  const match = (str: string) => link.includes(str);
  switch(true) {
    case(match('.pdf')):
      return MaterialType.Pdf

    case(match('youtube.com')):
      return MaterialType.Video

    case(match('.mp3')):
      return MaterialType.Podcast

    default:
      return null
  }
};

