import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfmfmforaonbcwrvrxer.supabase.co';
const supabaseAnonKey = 'sb_publishable_O1Ru6h2Dm6be2CrlP6Sz4Q_XJ8F8rKj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});