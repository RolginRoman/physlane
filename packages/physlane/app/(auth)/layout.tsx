export default function AuthLayout({
  children,
}: React.PropsWithChildren<void>) {
  return <div className="flex justify-center flex-col w-full">{children}</div>;
}
