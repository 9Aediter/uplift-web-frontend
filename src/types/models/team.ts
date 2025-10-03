// Team member models

export interface TeamMemberSocial {
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface TeamMemberCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  experience: string;
  skills: string[];
  specialties: string[];
  languages: string[];
  certifications: TeamMemberCertification[];
  social: TeamMemberSocial;
  image?: string;
}

export interface TeamsPageData {
  title: string;
  description: string;
  team: TeamMember[];
}
