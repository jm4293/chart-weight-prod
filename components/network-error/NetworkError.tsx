'use client';

import { NetworkOffline } from '@/components/network-offline';

interface IProps {
  children: React.ReactNode;
}

export const NetworkError = (props: IProps) => {
  const { children } = props;

  const { isNetworkOffline } = NetworkOffline();

  if (isNetworkOffline) {
    return (
      <div>
        <main>
          <h1 className="a11y-hidden">인터넷 접속 오류 페이지</h1>
          <section>
            <h2>현재 접속이 원활하지 않아요.</h2>
            <p>
              네트워크 문제로 화면을 불러오지 못하였습니다. 잠시 후 다시 시도해
              주세요.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return <>{children}</>;
};
