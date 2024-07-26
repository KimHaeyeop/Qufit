import { Link } from 'react-router-dom';

const authCodePath = import.meta.env.VITE_AUTH_CODE_PATH;
const restApiKey = import.meta.env.VITE_CLIIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

const LoginBtn = () => {
    const KAKAO_URL = `${authCodePath}?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
    return <Link to={KAKAO_URL}>나를 누르면 카카오 소셜로그인을 할 수 있어</Link>;
};

export default LoginBtn;
