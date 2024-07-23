import { PATH } from '@routers/PathConstants';
import { NavLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '@assets/lottie/twincle.json';
import { Logo, ChatButtonIcon, MyPageIcon, NotiIcon } from '@assets/svg';

const Header = () => {
    return (
        <div className="w-full aspect-header relative rounded-t-[2.75rem] border-y-2 border-x-4 effect-layout-2 border-lightPurple-3 lg:rounded-t-[2rem]">
            <div className="absolute z-10 flex items-center justify-between w-full h-full px-20">
                <NavLink to={PATH.MAIN}>
                    <div>
                        <Logo className="relative w-[7.1875rem] lg:w-20" />
                        <Lottie
                            animationData={animationData}
                            className="absolute w-52 left-9 top-10 lg:rounded-b-[2rem] lg:w-32 lg:left-12"
                        />
                    </div>
                </NavLink>

                <div className="flex">
                    <NavLink to={PATH.CHATTING}>
                        <ChatButtonIcon className="mr-10 w-14 lg:w-10 lg:mr-6" />
                    </NavLink>

                    <NavLink to={PATH.MY_PAGE}>
                        <MyPageIcon className="mr-10 w-14 lg:w-10 lg:mr-6" />
                    </NavLink>
                    <div className="relative flex">
                        <NotiIcon className="w-10 lg:w-6" />
                        <div className="absolute right-1 top-3 lg:right-0.5 lg:top-2">
                            <span className="relative flex w-3 aspect-square lg:w-2">
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-pink animate-ping"></span>
                                <span className="relative inline-flex w-3 rounded-full aspect-square bg-pink"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full bg-whitePink opacity-20 rounded-t-[2.75rem] z-0 lg:rounded-t-[2rem]" />
        </div>
    );
};

export default Header;
