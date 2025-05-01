import { supabase } from '../config/supabase';
import { Member, MemberFormData } from '../types';

export const api = {
  // Get all members
  getAllMembers: async (): Promise<Member[]> => {
    const { data, error } = await supabase.from('members').select('*');
    if (error) throw error;
    return data || [];
  },

  // Get single member by ID
  getMemberById: async (id: string): Promise<Member> => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  // Add new member with form data (including image upload)
  addMember: async (memberData: MemberFormData): Promise<Member> => {
    // Upload image if present
    let imagePath = '';
    if (memberData.profile_image) {
      const fileExt = memberData.profile_image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, memberData.profile_image);

      if (uploadError) throw uploadError;
      imagePath = `https://<your-project-ref>.supabase.co/storage/v1/object/public/profile-images/${fileName}`;
    }

    // Insert member data
    const { data, error } = await supabase.from('members').insert([
      {
        full_name: memberData.full_name,
        role: memberData.role,
        email: memberData.email,
        contact_number: memberData.contact_number,
        profile_image_url: imagePath,
      },
    ]).select().single();

    if (error) throw error;
    return data;
  },
};
