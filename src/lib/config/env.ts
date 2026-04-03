// src\lib\config\env.ts

import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),

  NEXT_PUBLIC_SUPABASE_URL: z.string().optional().default(""),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default(""),

  NEXT_PUBLIC_ENABLE_PAYMENTS: z.enum(["true", "false"]).default("false"),
  NEXT_PUBLIC_MAINTENANCE_MODE: z.enum(["true", "false"]).default("false"),
  NEXT_PUBLIC_DEBUG: z.enum(["true", "false"]).default("false"),
});

const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,

  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

  NEXT_PUBLIC_ENABLE_PAYMENTS: process.env.NEXT_PUBLIC_ENABLE_PAYMENTS,
  NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
  NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
});

export const env = {
  app: {
    name: parsedEnv.NEXT_PUBLIC_APP_NAME,
    url: parsedEnv.NEXT_PUBLIC_APP_URL,
    apiBaseUrl: parsedEnv.NEXT_PUBLIC_API_BASE_URL,
  },

  supabase: {
    url: parsedEnv.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: parsedEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  features: {
    enablePayments: parsedEnv.NEXT_PUBLIC_ENABLE_PAYMENTS === "true",
    maintenanceMode: parsedEnv.NEXT_PUBLIC_MAINTENANCE_MODE === "true",
    debug: parsedEnv.NEXT_PUBLIC_DEBUG === "true",
  },
} as const;
