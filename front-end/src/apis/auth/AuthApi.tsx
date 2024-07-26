import { ACCESS_TOKEN_URL, FRONT_URL, REDIRECT_URI, REST_API_KEY } from '@apis/ApiConstants';
import axios from 'axios';

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
    console.log(response);
    //TODO: 예외처리해야함
    const accessToken = response.data.access_token;

    return accessToken;
};
