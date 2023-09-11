import ky from 'ky-universal';

export const api: typeof ky = ky.create({
  prefixUrl: `${
    process.env['BASE_URL'] ?? process.env['NEXT_PUBLIC_BASE_URL']
  }/api`,
});
