import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/lib/provider';
import { NetworkError } from '@/components/network-error';
import { Modal, Toast } from '@/components/modal';
import Header from '@/components/header';

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: '동탄연세맑은내과 투석실',
  description: '투석실',
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
        <Header />
        <NetworkError>
          <Providers>
            <main className="main-layout">{children}</main>
          </Providers>
        </NetworkError>

        <Modal />
        <Toast />

        <div id="modal-root" />
        <div id="toast-root" />
      </body>
    </html>
  );
}
