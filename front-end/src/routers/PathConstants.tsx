const KAKAO_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const PATH = {
    ROOT: '/',
    SIGN_UP: '/signup',
    INTRODUCTION: '/introduction',
    MAIN: '/main',
    CHATTING: '/chatting',
    MY_PAGE: '/mypage',
    GROUP_VIDEO: (roomId: String) => `/video/group/${roomId}`,
    PERSONAL_VIDEO: (roomId: String) => `/video/personal/${roomId}`,

    //카카오 소셜로그인 관련
    KAKAO_REDIRECT: KAKAO_REDIRECT_URI,
};
