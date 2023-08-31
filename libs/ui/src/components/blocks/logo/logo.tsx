import logo from './assets/logo.svg';
import logoFull from './assets/logo-full.svg';
import Image, { ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src' | 'alt'> & { full: boolean };

export function Logo({ full = false, height = 48, width = 48 }: Props) {
  return (
    <Image
      src={full ? logoFull : logo}
      alt=""
      priority
      width={width}
      height={height}
    ></Image>
  );
}
