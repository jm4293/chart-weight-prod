import type { Metadata } from 'next';
import './globals.css';
import { NetworkError } from '@/components/network-error';
import { Modal, Toast } from '@/components/modal';
import Header from './Header';
import { Footer } from './Footer';
import QueryProvider from '@/lib/provider';
import GlobalLoading from './GlobalLoading';

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: '동탄연세맑은내과 투석실',
  description: '동탄연세맑은내과 투석실 몸무게 기록 서비스',
  icons: {
    icon: [
      { rel: 'apple-touch-icon', url: '/logo-small.png', sizes: '180x180' },
      { rel: 'icon', url: '/logo-small.png' },
    ],
  },
};

export default function RootLayout(props: IProps) {
  const { children } = props;

  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>동탄연세맑은내과 투석실</title>
      </head>
      <body>
        <NetworkError>
          <QueryProvider>
            <div className="relative">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
            <GlobalLoading />
          </QueryProvider>
        </NetworkError>

        <Modal />
        <Toast />

        <div id="modal-root" />
        <div id="toast-root" />
      </body>
    </html>
  );
}
