"use client";

import { PasswordProtection } from "@/components/ui/password-protection";

export default function FomaPage() {
  return (
    <PasswordProtection
      correctPassword="michaelzhou"
      redirectPath="/foma/content"
    />
  );
}
