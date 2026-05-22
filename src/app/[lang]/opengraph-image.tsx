import { ImageResponse } from 'next/og';
import { getDictionary } from '@/dictionaries';

export const runtime = 'edge';
export const alt = 'Bocancorp OpenGraph Image';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: 'es' | 'en' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000c2d',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>BOCANCORP</div>
        <div style={{ fontSize: 32, textAlign: 'center', padding: '0 40px' }}>
          {dict.seo.ogTitle}
        </div>
      </div>
    ),
    { ...size }
  );
}
