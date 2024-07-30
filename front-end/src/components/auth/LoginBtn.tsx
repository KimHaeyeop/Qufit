import { AUTH_CODE_PATH, FRONT_URL, REDIRECT_URI, REST_API_KEY } from '@apis/ApiConstants';
import { Link } from 'react-router-dom';

const LoginBtn = () => {
    const KAKAO_URL = `${AUTH_CODE_PATH}?client_id=${REST_API_KEY}&redirect_uri=${
        FRONT_URL + REDIRECT_URI
    }&response_type=code`;
    return <Link to={KAKAO_URL}>나를 누르면 카카오 소셜로그인을 할 수 있어</Link>;
};

export default LoginBtn;
