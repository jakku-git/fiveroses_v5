import { Metadata } from "next";
import GranvillePlaceClient from "../client";

export const metadata: Metadata = {
  title: "Granville Place - 12-Month Growth Plan | Shokai AusBao",
  description: "A$145,000 marketing plan for Granville Place including search, social, OOH, Chinese media, and CRO strategies.",
  openGraph: {
    title: "Granville Place - 12-Month Growth Plan",
    description: "A$145,000 marketing plan for Granville Place including search, social, OOH, Chinese media, and CRO strategies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Granville Place - 12-Month Growth Plan",
    description: "A$145,000 marketing plan for Granville Place including search, social, OOH, Chinese media, and CRO strategies.",
  },
  alternates: {
    canonical: "/granville-place",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function GranvillePlaceContentPage() {
  return <GranvillePlaceClient />;
}

