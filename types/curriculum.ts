interface BaseEntity {
  _id: string;
  title: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string; 
}
export type MaterialCategory = 'video' | 'article' | 'problem' | string;
export type LayoutType = 'list' | 'grid' | string;
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | string;
export interface ReactionCounts {
  fire: number;
  thumbsUp: number;
  thumbsDown: number;
  heart: number;
}

export interface Materials extends BaseEntity {
  slug: string;
  category: MaterialCategory;
  description?: string; 
  content?: string;    
  path?: string; 
  difficulty?: DifficultyLevel;
  companies?: string[];
  answer?: string; 
  solution?: string;
  topic?: string;
  snippet?: string;     
  codeQuestion?: string;
  reactions?: ReactionCounts;
}

export interface Curriculum_Subtopics extends BaseEntity {
  description?: string;
  layout?: LayoutType;
  materials: Materials[]; 
}

export interface Curriculum_Topics extends BaseEntity {
  slug: string;
  description?: string;
  heading?: string;
  subheading?: string;
  order?: number;
  coverImgUrl?: string;
  code?: string;
  subtopics: Curriculum_Subtopics[];
}

export interface Curriculum_Subjects extends BaseEntity {
  slug: string;
  description?: string;
  coverImgUrl?: string;
  thumbnail?: string;
  score?: number;    
  code?: string;
  topics: Curriculum_Topics[];
}

export interface Curriculum extends BaseEntity {
  slug: string;
  description: string;
  coverImgUrl?: string;
  thumbnail?: string;
  score?: number;
  code?: string;
  snippet?: string;
  subjects: Curriculum_Subjects[];
}