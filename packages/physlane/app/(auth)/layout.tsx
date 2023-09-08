export default function AuthLayout({
  children,
}: React.PropsWithChildren<void>) {
  return (
    <div className="flex grow flex-col w-full">
      <div className="grow md:grid md:grid-cols-2">
        <div className="bg-slate-200 hidden md:block"></div>
        {children}
      </div>
    </div>
  );
}
