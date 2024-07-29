import { getKakaoAccessToken, login } from '@apis/auth/AuthApi';
import { useSearchParams } from 'react-router-dom';

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();

    const authCode = searchParams.get('code');

    getKakaoAccessToken(authCode!).then((response) => login(response.data.access_token));
    return <div>카카오 리다이렉트 페이지</div>;
};

export default KakaoRedirectPage;
