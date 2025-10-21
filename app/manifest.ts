import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '동탄연세맑은내과 투석실',
    short_name: ' 동탄연세맑은내과',
    description: '동탄연세맑은내과 투석실 몸무게 기록 서비스',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/logo-small.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo-small.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
