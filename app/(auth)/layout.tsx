export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section>
      <div className="flex flex-col items-center gap-6">{children}</div>
    </section>
  )
}
