interface BaseEntity {
  _id: string;
  title: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type MaterialCategory = 'video' | 'article' | 'problem' | string;

export interface Materials extends BaseEntity {
  category: MaterialCategory;
  slug: string;
  difficulty?: 'easy' | 'medium' | 'hard' | string;
  companies?: string[];
  path?: string;
  topic?: string;
  answer?: string;
  solution?: string;
  snippet?: string;
  codeQuestion?: string;
}

export interface Curriculum_Subtopics extends BaseEntity {
  description?: string;
  layout?: 'list' | 'grid' | string;
  materials: Materials[]; 
}

export interface Curriculum_Topics extends BaseEntity {
  description?: string;
  slug: string;
  code?: string;
  order?: number;
  heading?: string;
  subheading?: string;
  coverImgUrl?: string;
  subtopics: Curriculum_Subtopics[];
}

export interface Curriculum_Subjects extends BaseEntity {
  description?: string;
  slug: string;
  code?: string;
  coverImgUrl?: string;
  thumbnail?: string;
  score?: number;
  topics: Curriculum_Topics[];
}

export interface Curriculum extends BaseEntity {
  description: string;
  slug: string;
  code?: string;
  coverImgUrl?: string;
  thumbnail?: string;
  score?: number;
  snippet?: string;
  subjects: Curriculum_Subjects[];
}