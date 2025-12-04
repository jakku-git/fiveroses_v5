"use client";

import { PasswordProtection } from "@/components/ui/password-protection";

export default function MofaPage() {
  return (
    <PasswordProtection
      correctPassword="michaelzhou"
      redirectPath="/foma/content"
    />
  );
}
