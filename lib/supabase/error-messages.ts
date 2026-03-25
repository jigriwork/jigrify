import type { AuthError } from "@supabase/supabase-js";

const MISSING_PROFILES_TABLE_PATTERN = /Could not find the table 'public\.profiles' in the schema cache/i;

export function isProfilesTableSchemaCacheError(message?: string | null) {
  if (!message) {
    return false;
  }

  return MISSING_PROFILES_TABLE_PATTERN.test(message);
}

export function getFriendlyAuthError(error: AuthError | { message?: string } | null) {
  const message = error?.message?.toLowerCase() ?? "";

  if (message.includes("invalid login credentials")) {
    return "That email or password doesn't match. Try again.";
  }

  if (message.includes("email not confirmed")) {
    return "Please verify your email, then log in.";
  }

  if (message.includes("user already registered")) {
    return "An account already exists for this email. Try logging in instead.";
  }

  return "We couldn't complete that right now. Please try again in a moment.";
}

export function getFriendlyProfileError(error: { message?: string } | null) {
  const message = error?.message;

  if (isProfilesTableSchemaCacheError(message)) {
    return "We're syncing your profile setup right now. Please try again in a few seconds.";
  }

  if (message?.toLowerCase().includes("duplicate key")) {
    return "That username is already taken. Try another one.";
  }

  return "We couldn't save your profile just now. Please try again.";
}
