import Image, { ImageProps } from "next/image";
import logoFull from "./assets/logo-full.svg";
import logo from "./assets/logo.svg";

type Props = Omit<ImageProps, "src" | "alt" | "height"> & { full: boolean } & {
  height?: ImageProps["height"] | "auto";
};

export function Logo({ full = false, height = "auto", width = 48 }: Props) {
  return (
    <Image
      src={full ? logoFull : logo}
      alt=""
      priority
      width={width}
      height={height === "auto" ? undefined : height}
    />
  );
}
