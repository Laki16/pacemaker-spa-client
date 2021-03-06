import { createAction } from 'redux-actions';
import { SIGNIN, SIGNOUT } from '../type/account';

/**
 * Sign In Async Action을 수행한 후 받은 데이터를 스토어에 저장.
 */
export const signin = createAction(SIGNIN, (data) => ({
  id: data.id,
  name: data.name,
  type: data.type,
  token: data.token,
}));

/**
 * 현재 저장된 계정 정보를 제거
 */
export const signout = createAction(SIGNOUT);
