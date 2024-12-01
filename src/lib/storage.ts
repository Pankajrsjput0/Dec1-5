import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export async function uploadNovelCover(file: File): Promise<string> {
  try {
    // Generate a unique filename with UUID
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = fileName;

    // Upload the file to Supabase storage
    const { error: uploadError, data } = await supabase.storage
      .from('novel_covers')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type // Explicitly set content type
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('novel_covers')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading novel cover:', error);
    throw error;
  }
}

export async function uploadProfilePicture(file: File): Promise<string> {
  try {
    // Generate a unique filename with UUID
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = fileName;

    // Upload the file to Supabase storage
    const { error: uploadError, data } = await supabase.storage
      .from('profile_pictures')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type // Explicitly set content type
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile_pictures')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
}