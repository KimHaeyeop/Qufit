export const PATH = {
    ROOT: '/',
    SIGN_UP: '/signup',
    INTRODUCTION: '/introduction',
    MAIN: '/main',
    CHATTING: '/chatting',
    MY_PAGE: '/mypage',
    GROUP_VIDEO: (roomId: String) => `/video/group/${roomId}`,
    PERSONAL_VIDEO: (roomId: String) => `/video/personal/${roomId}`,
};
