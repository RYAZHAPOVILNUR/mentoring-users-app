export interface Material {
    id: string | number,
    created_at: string,
    title: string,
    type: 'video' | 'pdf' | 'audio',
    irl: string,
    folder_id: string | number,
  }