'use server';

import { supabase } from '@/lib/supabase';
import { UserSpec } from '@/store/useUserStore';

export async function saveProfile(deviceId: string, spec: Partial<UserSpec>) {
  if (!deviceId) return { success: false, error: 'Device ID is required' };

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        device_id: deviceId,
        height: spec.gender ? parseFloat(spec.gender) : null, // Assuming gender is not in DB schema but just holding structure. Update mappings as needed.
        handicap: spec.handicap ? parseInt(spec.handicap, 10) : null,
        average_distance: spec.averageDistance ? parseFloat(spec.averageDistance) : null,
        swing_speed: spec.swingSpeed ? parseFloat(spec.swingSpeed) : null,
        preferred_brand: spec.preferredBrand || null,
      }, { onConflict: 'device_id' });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Error saving profile:', error);
    return { success: false, error: error.message };
  }
}

export async function getProfile(deviceId: string) {
  if (!deviceId) return { success: false, error: 'Device ID is required' };

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('device_id', deviceId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is not found, which is fine
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return { success: false, error: error.message };
  }
}
