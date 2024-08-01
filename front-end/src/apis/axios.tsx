import { HTTP_STATUS, KAKAO_LOGIN_URL } from '@apis/ApiConstants';
import { useSetAccessTokenStore } from '@stores/auth/signUpStore';
import axios from 'axios';
const qufitAcessToken = import.meta.env.VITE_QUFIT_ACCESS_TOKEN;
//로그인을 하고 해야하는 API
export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: 'Bearer ' + qufitAcessToken,
    },
});

//로그인 요청없이 해야하는 API
export const defaultInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (
            error.response.status === HTTP_STATUS.UNAUTHORIZED &&
            error.response.data.message === '토큰이 만료되었습니다.'
        ) {
            location.href = KAKAO_LOGIN_URL;
            //TODO:로그인 로직 성공하면 토큰 다시 넣어야함.
        }
        return Promise.reject;
    },
);
