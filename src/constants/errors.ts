export enum ERROR_CODES {
  INVALID_REQUEST = 'INVALID_REQUEST',
  INVALID_PARAMS = 'INVALID_PARAMS',
  
  INVALID_TOKEN = 'INVALID_TOKEN',
  
  NOT_FOUND = 'NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_TOKEN]: 'INVALID_TOKEN',
  [ERROR_CODES.INVALID_PARAMS]: 'INVALID_PARAMS',
  [ERROR_CODES.NOT_FOUND]: 'NOT_FOUND',
  [ERROR_CODES.FORBIDDEN]: 'FORBIDDEN',
  [ERROR_CODES.UNAUTHORIZED]: 'UNAUTHORIZED',
};

export function getErorrMessage(errorCode: ERROR_CODES): string {
  return ERROR_MESSAGES[errorCode];
}
