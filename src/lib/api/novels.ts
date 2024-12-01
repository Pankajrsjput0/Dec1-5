import { supabase } from '../supabase';
import { Novel } from '../../types';
import { uploadNovelCover } from '../storage';
import { toast } from 'react-hot-toast';

export async function createNovel(
  formData: Omit<Novel, 'novel_id' | 'views' | 'created_at' | 'updated_at'>,
  coverImage: File | null,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    let novel_coverpage = null;

    // Upload cover image if provided
    if (coverImage) {
      novel_coverpage = await uploadNovelCover(coverImage);
    }

    // Create the novel
    const { data, error } = await supabase
      .from('Novels')
      .insert([{
        ...formData,
        novel_coverpage,
        upload_by: userId,
        views: 0,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    toast.success('Novel created successfully!');
    return { success: true };
  } catch (error: any) {
    console.error('Error creating novel:', error);
    toast.error(error.message || 'Failed to create novel');
    return { success: false, error: error.message };
  }
}