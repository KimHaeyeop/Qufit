import { PATH } from '@routers/PathConstants';
import { NavLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '@assets/lottie/twincle.json';
import { Logo, ChatButtonIcon, MyPageIcon, NotiIcon } from '@assets/svg';

const Header = () => {
    return (
        <div className="w-full aspect-header relative rounded-t-[2.75rem] border-y-2 border-x-4 effect-layout-2 border-lightPurple-3">
            <div className="absolute z-10 flex items-center justify-between w-full h-full px-20">
                <NavLink to={PATH.MAIN}>
                    <div>
                        <Logo className="relative w-[7.1875rem]" />
                        <Lottie animationData={animationData} className="absolute w-52 left-9 top-10" />
                    </div>
                </NavLink>

                <div className="flex">
                    <NavLink to={PATH.CHATTING}>
                        <ChatButtonIcon className="mr-10 w-14" />
                    </NavLink>

                    <NavLink to={PATH.MY_PAGE}>
                        <MyPageIcon className="mr-10 w-14" />
                    </NavLink>
                    <div className="relative flex">
                        <NotiIcon className="w-10" />
                        <div className="absolute right-1 top-3">
                            <span className="relative flex w-3 aspect-square">
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-pink animate-ping"></span>
                                <span className="relative inline-flex w-3 rounded-full aspect-square bg-pink"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full bg-whitePink opacity-20 rounded-t-[3.75vw] z-0" />
        </div>
    );
};

export default Header;
