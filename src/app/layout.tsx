import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'はろーわー - Clean Architecture Demo',
  description: 'NextJS Clean Architecture構成で「はろーわー」を表示するアプリケーション',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

