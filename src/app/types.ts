// types/index.ts (create this file if it doesn't exist)

export interface Article {
  url: string;
  title: string;
}

export interface Video {
  url: string;
  title: string;
}

export interface LanguageData {
  slug: string;
  name: string;
}

export interface ResourceData {
  description: string;
  articles?: Article[]; // Optional, as it might not always be present
  youtube?: Video[]; // Optional
}
