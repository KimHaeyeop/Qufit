import { getKakaoAccessToken } from '@apis/auth/AuthApi';
import { useSearchParams } from 'react-router-dom';

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();

    const authCode = searchParams.get('code');

    console.log(authCode);
    const accessToken = getKakaoAccessToken(authCode!);
    console.log(accessToken);
    return <div>카카오 리다이렉트 페이지</div>;
};

export default KakaoRedirectPage;
