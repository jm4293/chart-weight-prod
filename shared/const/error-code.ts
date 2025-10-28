export const ERROR_CODE = {
  // 클라이언트 에러 (4xx)
  BAD_REQUEST: 'BAD_REQUEST', // 잘못된 요청
  UNAUTHORIZED: 'UNAUTHORIZED', // 인증 필요
  FORBIDDEN: 'FORBIDDEN', // 권한 없음
  NOT_FOUND: 'NOT_FOUND', // 리소스를 찾을 수 없음
  CONFLICT: 'CONFLICT', // 중복된 데이터
  VALIDATION_ERROR: 'VALIDATION_ERROR', // 유효성 검증 실패

  // 서버 에러 (5xx)
  INTERNAL_ERROR: 'INTERNAL_ERROR', // 서버 내부 오류
  DATABASE_ERROR: 'DATABASE_ERROR', // 데이터베이스 오류
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE', // 서비스 이용 불가

  // 비즈니스 로직 에러
  INVALID_INPUT: 'INVALID_INPUT', // 입력값 오류
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD', // 필수 필드 누락
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY', // 중복 항목
  RESOURCE_EXPIRED: 'RESOURCE_EXPIRED', // 리소스 만료
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED', // 요청 제한 초과

  // 인증/인가 에러
  TOKEN_EXPIRED: 'TOKEN_EXPIRED', // 토큰 만료
  TOKEN_INVALID: 'TOKEN_INVALID', // 유효하지 않은 토큰
  SESSION_EXPIRED: 'SESSION_EXPIRED', // 세션 만료
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS', // 권한 부족

  // 네트워크 에러
  NETWORK_ERROR: 'NETWORK_ERROR', // 네트워크 오류
  TIMEOUT: 'TIMEOUT', // 타임아웃

  // 기타
  UNKNOWN_ERROR: 'UNKNOWN_ERROR', // 알 수 없는 오류
} as const;

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ERROR_CODE.BAD_REQUEST]: '잘못된 요청입니다.',
  [ERROR_CODE.UNAUTHORIZED]: '로그인이 필요합니다.',
  [ERROR_CODE.FORBIDDEN]: '접근 권한이 없습니다.',
  [ERROR_CODE.NOT_FOUND]: '요청한 리소스를 찾을 수 없습니다.',
  [ERROR_CODE.CONFLICT]: '이미 존재하는 데이터입니다.',
  [ERROR_CODE.VALIDATION_ERROR]: '입력값을 확인해주세요.',

  [ERROR_CODE.INTERNAL_ERROR]: '시스템 오류가 발생했습니다.',
  [ERROR_CODE.DATABASE_ERROR]: '데이터베이스 오류가 발생했습니다.',
  [ERROR_CODE.SERVICE_UNAVAILABLE]: '서비스를 일시적으로 사용할 수 없습니다.',

  [ERROR_CODE.INVALID_INPUT]: '입력값이 올바르지 않습니다.',
  [ERROR_CODE.MISSING_REQUIRED_FIELD]: '필수 입력값이 누락되었습니다.',
  [ERROR_CODE.DUPLICATE_ENTRY]: '중복된 항목이 존재합니다.',
  [ERROR_CODE.RESOURCE_EXPIRED]: '리소스가 만료되었습니다.',
  [ERROR_CODE.RATE_LIMIT_EXCEEDED]: '요청 횟수를 초과했습니다.',

  [ERROR_CODE.TOKEN_EXPIRED]: '토큰이 만료되었습니다.',
  [ERROR_CODE.TOKEN_INVALID]: '유효하지 않은 토큰입니다.',
  [ERROR_CODE.SESSION_EXPIRED]: '세션이 만료되었습니다.',
  [ERROR_CODE.INSUFFICIENT_PERMISSIONS]: '권한이 부족합니다.',

  [ERROR_CODE.NETWORK_ERROR]: '네트워크 오류가 발생했습니다.',
  [ERROR_CODE.TIMEOUT]: '요청 시간이 초과되었습니다.',

  [ERROR_CODE.UNKNOWN_ERROR]: '알 수 없는 오류가 발생했습니다.',
};
