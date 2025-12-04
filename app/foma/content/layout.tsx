import { metadata as mofaMetadata } from './metadata';

export const metadata = mofaMetadata;

export default function MofaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

