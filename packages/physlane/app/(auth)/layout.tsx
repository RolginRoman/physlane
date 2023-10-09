import Image from "next/image";
import authImage from "../assets/hero-measures-t.jpeg";

export default function AuthLayout({
  children,
}: React.PropsWithChildren<void>) {
  return (
    <div className="flex w-full grow flex-col">
      <div className="grow md:grid md:grid-cols-2">
        <div className="hidden bg-slate-200 md:block">
          <Image
            src={authImage}
            alt=""
            className="h-full w-full object-cover blur-[2px] saturate-0 transition "
          />
        </div>
        <div className="pb-12 pt-4 md:pt-0">{children}</div>
      </div>
    </div>
  );
}
