import { PATH } from '@routers/PathConstants';
import { NavLink } from 'react-router-dom';
import { Logo, ChatButtonIcon, MyPageIcon, NotiIcon } from '@assets/svg';

const Header = () => {
    return (
        <div className="w-10/12 aspect-layout2 relative rounded-t-[3.75vw] border-y-2 border-x-4 effect-layout-2 border-lightPurple-3">
            <div className="absolute z-10 flex items-center justify-between w-full h-full px-20">
                <NavLink to={PATH.MAIN}>
                    <Logo className="w-[9vw]" />
                </NavLink>

                <div className="flex">
                    <NavLink to={PATH.CHATTING}>
                        <ChatButtonIcon className="w-[5vw] mr-12" />
                    </NavLink>

                    <NavLink to={PATH.MY_PAGE}>
                        <MyPageIcon className="w-[5vw] mr-12" />
                    </NavLink>
                    <div className="relative flex">
                        <NotiIcon className="w-[3vw]" />
                        <div className="absolute right-2 top-4">
                            <span className="relative flex w-[0.75vw] aspect-square">
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-pink animate-ping"></span>
                                <span className="relative inline-flex w-[0.75vw] aspect-square rounded-full bg-pink"></span>
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
