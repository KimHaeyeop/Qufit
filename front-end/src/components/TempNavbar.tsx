import { PATH } from '@routers/PathConstants';
import { NavLink } from 'react-router-dom';

//TODO: 임시용 navbar header 완성되면 삭제 가능
const TempNavbar = () => {
    return (
        <div className="flex gap-4">
            <NavLink to={PATH.INTRODUCTION} className={({ isActive }) => (isActive ? 'border-red-500 border-2' : '')}>
                소개
            </NavLink>
            <NavLink to={PATH.MAIN} className={({ isActive }) => (isActive ? 'border-red-500 border-2' : '')}>
                메인
            </NavLink>
            <NavLink to={PATH.SIGN_UP} className={({ isActive }) => (isActive ? 'border-red-500 border-2' : '')}>
                회원가입
            </NavLink>
            <NavLink to={PATH.CHATTING} className={({ isActive }) => (isActive ? 'border-red-500 border-2' : '')}>
                채팅
            </NavLink>
            <NavLink to={PATH.MY_PAGE} className={({ isActive }) => (isActive ? 'border-red-500 border-2' : '')}>
                마이
            </NavLink>
            <NavLink
                to={PATH.GROUP_VIDEO('1')}
                className={({ isActive }) => (isActive ? 'border-red-500 border-2' : '')}
            >
                다대다
            </NavLink>
            <NavLink
                to={PATH.PERSONAL_VIDEO('1')}
                className={({ isActive }) => (isActive ? 'border-red-500 border-2' : '')}
            >
                1대1
            </NavLink>
        </div>
    );
};

export default TempNavbar;
