export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      coherence_scores: {
        Row: {
          coherence_value: number
          created_at: string | null
          id: string
          input_data: string
          pattern_strength: number
          phase_alignment: number
        }
        Insert: {
          coherence_value: number
          created_at?: string | null
          id?: string
          input_data: string
          pattern_strength: number
          phase_alignment: number
        }
        Update: {
          coherence_value?: number
          created_at?: string | null
          id?: string
          input_data?: string
          pattern_strength?: number
          phase_alignment?: number
        }
        Relationships: []
      }
      interactions: {
        Row: {
          coherence_score: number
          created_at: string | null
          fibonacci_resonance: number
          id: string
          input_text: string
          output_text: string | null
          phase_twist: number
        }
        Insert: {
          coherence_score: number
          created_at?: string | null
          fibonacci_resonance: number
          id?: string
          input_text: string
          output_text?: string | null
          phase_twist: number
        }
        Update: {
          coherence_score?: number
          created_at?: string | null
          fibonacci_resonance?: number
          id?: string
          input_text?: string
          output_text?: string | null
          phase_twist?: number
        }
        Relationships: []
      }
      memory_buffer: {
        Row: {
          content: Json
          created_at: string | null
          fibonacci_index: number
          id: string
          retention_score: number
          timestamp_offset: number
        }
        Insert: {
          content: Json
          created_at?: string | null
          fibonacci_index: number
          id?: string
          retention_score: number
          timestamp_offset: number
        }
        Update: {
          content?: Json
          created_at?: string | null
          fibonacci_index?: number
          id?: string
          retention_score?: number
          timestamp_offset?: number
        }
        Relationships: []
      }
      neural_pathways: {
        Row: {
          activation_count: number | null
          coherence_strength: number
          id: string
          last_activated: string | null
          node_from: number
          node_to: number
          weight: number
        }
        Insert: {
          activation_count?: number | null
          coherence_strength?: number
          id?: string
          last_activated?: string | null
          node_from: number
          node_to: number
          weight?: number
        }
        Update: {
          activation_count?: number | null
          coherence_strength?: number
          id?: string
          last_activated?: string | null
          node_from?: number
          node_to?: number
          weight?: number
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          created_at: string | null
          golden_ratio_alignment: number | null
          id: string
          metric_type: string
          metric_value: number
        }
        Insert: {
          created_at?: string | null
          golden_ratio_alignment?: number | null
          id?: string
          metric_type: string
          metric_value: number
        }
        Update: {
          created_at?: string | null
          golden_ratio_alignment?: number | null
          id?: string
          metric_type?: string
          metric_value?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
