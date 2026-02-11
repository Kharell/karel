
export interface Project {
  title: string;
  description: string;
  tags: string[];
  role?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  title: string;
  company?: string;
  duration?: string;
  description: string[];
}
