import { ACCESS_TOKEN_URL, END_POINT, FRONT_URL, HttpStatus, REDIRECT_URI, REST_API_KEY } from '@apis/ApiConstants';
import { instance } from '@apis/axios';
import axios, { isAxiosError } from 'axios';

export const getKakaoAccessToken = async (authCode: string) => {
    const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } };
    const params = {
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirectUri: FRONT_URL + REDIRECT_URI,
        code: authCode,
        client_secret: 'XrshnZS6JgnenDmWMXo4YGUJ9PUZwnOH',
    };

    const response = await axios.post(ACCESS_TOKEN_URL, params, header);
    //TODO: 예외처리해야함
    const accessToken = response.data.access_token;

    return response;
};

export const login = async (accessToken: string) => {
    try {
        const response = await instance.get(END_POINT.LOGIN, { params: { accessToken: accessToken } });
        if (response.status === HttpStatus.OK) return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error);
            // if (error.response.status === HttpStatus.UNAUTHORIZED) {
            //     console.log(1111);
            // }
        }
    }
};
