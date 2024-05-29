export enum MaterialFormat {
  VIDEO = 'video',
  PDF = 'pdf',
  PODCAST = 'podcast',
}

export type TMaterialButton = {
  title: string,
  icon: string,
  value: MaterialFormat,
}
