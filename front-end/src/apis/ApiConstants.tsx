export const AUTH_CODE_PATH = import.meta.env.VITE_AUTH_CODE_PATH;
export const REST_API_KEY = import.meta.env.VITE_CLIIENT_ID;
export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
export const ACCESS_TOKEN_URL = import.meta.env.VITE_ACCESS_TOKEN_PATH;
export const FRONT_URL = import.meta.env.VITE_FRONT_URL;

export const END_POINT = {
    LOGIN: 'qufit/auth/login',
    SIGN_UP: 'qufit/auth/signup',
    CHECK_NICKNAME: 'qufit/check-nickname',
};

export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONTENT_TOO_LARGE: 413,
    INTERNAL_SERVER_ERROR: 500,
};
