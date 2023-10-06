export default function AuthLayout({
  children,
}: React.PropsWithChildren<void>) {
  return (
    <div className="flex w-full grow flex-col">
      <div className="grow md:grid md:grid-cols-2">
        <div className="hidden bg-slate-200 md:block" />
        {children}
      </div>
    </div>
  );
}
