import { metadata as fomaMetadata } from './metadata';

export const metadata = fomaMetadata;

export default function FomaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

