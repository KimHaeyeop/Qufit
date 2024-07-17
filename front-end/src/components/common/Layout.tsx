import Header from '@components/common/Header';
import { Outlet } from 'react-router-dom';

const Layout = ({ hasHeader }: { hasHeader: boolean }) => {
    return (
        // 나중에 페이지 url 별로 다른 bg 렌더링되도록 수정
        <div className="flex flex-col items-center justify-center w-screen h-screen py-4 bg-cover bg-mainPageBg">
            {hasHeader && (
                <>
                    <Header />
                    <div className="w-10/12 aspect-layout effect-layout border-b-4 border-x-2 border-lightPurple-4 rounded-b-[3.75vw] relative">
                        <Outlet />
                        <div className="w-full h-full rounded-b-[3.75vw] bg-whitePink opacity-20 z-0" />
                    </div>
                </>
            )}
        </div>
    );
};

export default Layout;
