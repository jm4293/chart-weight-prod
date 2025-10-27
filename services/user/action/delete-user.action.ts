'use server';

import { serverClient } from '@/lib/supabase';
import { SESSION_TOKEN_NAME } from '@/shared/const';
import { UserEmailType } from '@/shared/enum/user';
import { jwtUtil } from '@/utils/jwt-util';
import { cookies } from 'next/headers';
import { IUserOAuthTokenModel } from '../model';

interface IDeleteUserProps {
  userId: number;
  userUuid: string;
}

export async function deleteUserAction(props: IDeleteUserProps) {
  try {
    const { userId, userUuid } = props;

    const supabase = await serverClient();

    const { data: oauthToken } = await supabase
      .from('user_oauth_token')
      .select('*, user!inner(*)')
      .eq('userId', userId)
      .single<IUserOAuthTokenModel>();

    if (!oauthToken) {
      return {
        success: false,
        error: `OAuth token not found for user id: ${userId}`,
      };
    }

    if (oauthToken.provider === UserEmailType.KAKAO) {
      try {
        // 사용자 정보 확인
        await fetch('https://kapi.kakao.com/v2/user/me?secure_resource=false', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Bearer ${oauthToken.accessToken}`,
          },
        });

        // 연결 해제
        await fetch('https://kapi.kakao.com/v1/user/unlink', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${oauthToken.accessToken}`,
          },
        });
      } catch (kakaoError) {
        console.error('Kakao unlink error:', kakaoError);
        // 카카오 연결 해제가 실패해도 계속 진행
      }
    }

    if (oauthToken.provider === UserEmailType.NAVER) {
      try {
        await fetch(
          `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}&access_token=${oauthToken.accessToken}&service_provider=NAVER`,
          { method: 'POST' },
        );
      } catch (naverError) {
        console.error('Naver unlink error:', naverError);
        // 네이버 연결 해제가 실패해도 계속 진행
      }
    }

    const { data, error } = await supabase
      .from('user')
      .delete()
      .eq('id', userId)
      .eq('uuid', userUuid);

    if (error) {
      return {
        success: false,
        error: `Error deleting user: ${error.message}`,
      };
    }

    // 쿠키 삭제 (로그아웃)
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_TOKEN_NAME);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
