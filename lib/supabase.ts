import { createClient } from "@supabase/supabase-js";

const REQUIRED_ENV_NAMES = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY"
] as const;

function getMissingEnvNames() {
  return REQUIRED_ENV_NAMES.filter((name) => !process.env[name]);
}

function getSetupMessage(missingEnvNames: readonly string[]) {
  return [
    `Missing required Supabase environment variables: ${missingEnvNames.join(", ")}`,
    "Create .env.local from .env.example for local development.",
    "In Vercel, add the same values in Project Settings > Environment Variables.",
    "You also need to run supabase/schema.sql in the Supabase SQL Editor."
  ].join(" ");
}

// 環境変数未設定はデプロイ担当者向けの案内なので、例外名で区別してAPIレスポンスに表示する
export const SETUP_ERROR_NAME = "SupabaseSetupError";

export function getSupabaseAdminClient() {
  const missingEnvNames = getMissingEnvNames();

  if (missingEnvNames.length > 0) {
    const error = new Error(getSetupMessage(missingEnvNames));
    error.name = SETUP_ERROR_NAME;
    throw error;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}
