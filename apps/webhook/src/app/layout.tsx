export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='id'>
      <body>{children}</body>
    </html>
  )
}
