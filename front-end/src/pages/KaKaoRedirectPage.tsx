import { HttpStatus } from '@apis/ApiConstants';
import { getKakaoAccessToken, login } from '@apis/auth/AuthApi';
import { PATH } from '@routers/PathConstants';
import { useSetAccessTokenStore } from '@stores/auth/signUpStore';
import { isAxiosError } from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const authCode = searchParams.get('code');
    const setAccessToken = useSetAccessTokenStore();
    getKakaoAccessToken(authCode!).then((response) => {
        setAccessToken(response.data.access_token);
        login(response.data.access_token)
            .then((response) => console.log(response))
            .catch((error) => {
                if (isAxiosError(error)) {
                    console.log(error);
                    if (error.response?.data.status === HttpStatus.UNAUTHORIZED) {
                        if (error.response.data.errorMessage === '회원 가입이 필요합니다.') {
                            navigate(PATH.SIGN_UP);
                        } else if (error.response.data.errorMessage === '가입 승인 대기 중인 계정입니다.') {
                            navigate(PATH.INTRODUCTION);
                        }
                    }
                }
            });
    });

    return <div>카카오 리다이렉트 페이지</div>;
};

export default KakaoRedirectPage;
