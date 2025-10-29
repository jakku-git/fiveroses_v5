"use client";

import { PasswordProtection } from "@/components/ui/password-protection";

export default function GranvillePlacePage() {
  return (
    <PasswordProtection
      correctPassword="shokai2025"
      redirectPath="/granville-place/content"
    />
  );
}

