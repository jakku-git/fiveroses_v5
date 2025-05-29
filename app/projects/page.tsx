"use client";

import { PasswordProtection } from "@/components/ui/password-protection";

export default function ProjectsPage() {
  return (
    <PasswordProtection
      correctPassword="rifold2025"
      redirectPath="/projects/rifold"
    />
  );
} 