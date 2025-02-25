// TODO: fix http://localhost:3000/signup 500 (Internal Server Error) on refresh
export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <section className={'auth-page'}>{children}</section>
}
