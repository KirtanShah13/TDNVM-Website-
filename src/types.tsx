export interface President {
  no: number;
  "President Name": string;
  "Presidency Year": string;
  "Secretary Name": string;
  "Secretary Year": string;
}

export interface CoreTeamMember {
  id: number;
  name: string;
  designation: string;
  photo: string;
  description: string;
  email: string;
  phone: number; // Optional field for ordering
  linkedin: string;
  experience: string;
  achievements: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  year: string;
  category: string;
  images: string;
}

export interface GalleryEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  event: string;
  date: string;
  location: string;
  images: string;
}
