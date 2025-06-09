export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_type: string | null
          city: string | null
          country: string | null
          id: number
          is_default: boolean
          postal_code: string | null
          state: string | null
          street: string | null
          user_id: number
        }
        Insert: {
          address_type?: string | null
          city?: string | null
          country?: string | null
          id?: number
          is_default: boolean
          postal_code?: string | null
          state?: string | null
          street?: string | null
          user_id: number
        }
        Update: {
          address_type?: string | null
          city?: string | null
          country?: string | null
          id?: number
          is_default?: boolean
          postal_code?: string | null
          state?: string | null
          street?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk1fa36y2oqhao3wgg2rw1pi459"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          description: string | null
          featured: boolean
          id: number
          logo: string | null
          name: string
          slug: string
        }
        Insert: {
          description?: string | null
          featured: boolean
          id?: number
          logo?: string | null
          name: string
          slug: string
        }
        Update: {
          description?: string | null
          featured?: boolean
          id?: number
          logo?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          cart_id: number
          color: string | null
          id: number
          price: number
          product_id: number
          quantity: number | null
          size: string | null
        }
        Insert: {
          cart_id: number
          color?: string | null
          id?: number
          price: number
          product_id: number
          quantity?: number | null
          size?: string | null
        }
        Update: {
          cart_id?: number
          color?: string | null
          id?: number
          price?: number
          product_id?: number
          quantity?: number | null
          size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk1re40cjegsfvw58xrkdp6bac6"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fkpcttvuq4mxppo8sxggjtn5i2c"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fkb5o626f86h46m4s7ms6ginnop"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          description: string | null
          id: number
          image: string | null
          image_url: string | null
          name: string
          slug: string
        }
        Insert: {
          description?: string | null
          id?: number
          image?: string | null
          image_url?: string | null
          name: string
          slug: string
        }
        Update: {
          description?: string | null
          id?: number
          image?: string | null
          image_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          color: string | null
          id: number
          image_url: string | null
          name: string
          order_id: number
          price: number
          product_id: number
          product_image: string | null
          product_name: string
          quantity: number
          size: string | null
          subtotal: number
        }
        Insert: {
          color?: string | null
          id?: number
          image_url?: string | null
          name: string
          order_id: number
          price: number
          product_id: number
          product_image?: string | null
          product_name: string
          quantity: number
          size?: string | null
          subtotal: number
        }
        Update: {
          color?: string | null
          id?: number
          image_url?: string | null
          name?: string
          order_id?: number
          price?: number
          product_id?: number
          product_image?: string | null
          product_name?: string
          quantity?: number
          size?: string | null
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "fkbioxgbv59vetrxe0ejfubep1w"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fkocimc7dtr037rh4ls4l95nlfi"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          city: string | null
          country: string | null
          date: string
          delivered_date: string | null
          first_name: string | null
          id: number
          last_name: string | null
          order_date: string | null
          order_number: string | null
          payment_date: string | null
          payment_id: string | null
          payment_method: string | null
          phone_number: string | null
          postal_code: string | null
          shipped_date: string | null
          shipping_cost: number | null
          state: string | null
          status: string | null
          street: string | null
          subtotal: number | null
          tax: number | null
          total: number | null
          total_amount: number
          tracking_number: string | null
          user_id: number
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          date: string
          delivered_date?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          order_date?: string | null
          order_number?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_method?: string | null
          phone_number?: string | null
          postal_code?: string | null
          shipped_date?: string | null
          shipping_cost?: number | null
          state?: string | null
          status?: string | null
          street?: string | null
          subtotal?: number | null
          tax?: number | null
          total?: number | null
          total_amount: number
          tracking_number?: string | null
          user_id: number
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          date?: string
          delivered_date?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          order_date?: string | null
          order_number?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_method?: string | null
          phone_number?: string | null
          postal_code?: string | null
          shipped_date?: string | null
          shipping_cost?: number | null
          state?: string | null
          status?: string | null
          street?: string | null
          subtotal?: number | null
          tax?: number | null
          total?: number | null
          total_amount?: number
          tracking_number?: string | null
          user_id?: number
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk32ql8ubntj5uh44ph9659tiih"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_colors: {
        Row: {
          color: string | null
          product_id: number
        }
        Insert: {
          color?: string | null
          product_id: number
        }
        Update: {
          color?: string | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fkqhu7cqni31911lmvx4fqmiw65"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          image_url: string | null
          product_id: number
        }
        Insert: {
          image_url?: string | null
          product_id: number
        }
        Update: {
          image_url?: string | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fkqnq71xsohugpqwf3c9gxmsuy"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_sizes: {
        Row: {
          product_id: number
          size: string | null
        }
        Insert: {
          product_id: number
          size?: string | null
        }
        Update: {
          product_id?: number
          size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk4isa0j51hpdn7cx04m831jic4"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          brand_id: number | null
          category_id: number | null
          created_at: string | null
          description: string | null
          featured: boolean
          id: number
          inventory: number
          main_image: string | null
          name: string
          price: number
          sale_price: number | null
          slug: string
          stock_quantity: number
          updated_at: string | null
        }
        Insert: {
          active: boolean
          brand_id?: number | null
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          featured: boolean
          id?: number
          inventory: number
          main_image?: string | null
          name: string
          price: number
          sale_price?: number | null
          slug: string
          stock_quantity: number
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          brand_id?: number | null
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          featured?: boolean
          id?: number
          inventory?: number
          main_image?: string | null
          name?: string
          price?: number
          sale_price?: number | null
          slug?: string
          stock_quantity?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fka3a4mpsfdf4d2y6r8ra3sc8mv"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fkog2rp4qthbtt2lfyhfo32lsw9"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          active: boolean
          address: string | null
          city: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: number
          image: string | null
          last_name: string | null
          name: string
          password: string
          phone: string | null
          phone_number: string | null
          role: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          active: boolean
          address?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: number
          image?: string | null
          last_name?: string | null
          name: string
          password: string
          phone?: string | null
          phone_number?: string | null
          role?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          active?: boolean
          address?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: number
          image?: string | null
          last_name?: string | null
          name?: string
          password?: string
          phone?: string | null
          phone_number?: string | null
          role?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
