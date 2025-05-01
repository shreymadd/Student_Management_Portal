export interface Member {
  id: string;
  full_name: string;
  role: string;
  email: string;
  contact_number: string;
  profile_image_url: string;
  created_at?: string;
}

export interface MemberFormData {
  full_name: string;
  role: string;
  email: string;
  contact_number: string;
  profile_image?: File | null;
}