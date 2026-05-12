/**
 * 🔐 Tipos generados de Supabase
 *
 * Para regenerar (cuando cambies la DB):
 *   npx supabase gen types typescript --project-id TU_PROJECT_ID > src/types/supabase.ts
 *
 * Por ahora es un placeholder. Se regenera cuando ejecutemos el comando.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Se llenará automáticamente con `supabase gen types`
      [_ in string]: never;
    };
    Views: {
      [_ in string]: never;
    };
    Functions: {
      [_ in string]: never;
    };
    Enums: {
      [_ in string]: never;
    };
  };
}
