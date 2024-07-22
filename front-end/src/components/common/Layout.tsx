import Header from '@components/common/Header';
import { Outlet } from 'react-router-dom';

const Layout = ({ hasHeader }: { hasHeader: boolean }) => {
    return (
        // 나중에 페이지 url 별로 다른 bg 렌더링되도록 수정
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-cover px-14 bg-mainPageBg">
            {
                <>
                    {hasHeader && <Header />}
                    <div className="w-full aspect-layout effect-layout border-b-4 border-x-2 border-lightPurple-4 rounded-b-[2.75rem] relative">
                        <Outlet />
                        <div className="z-0 w-full h-full rounded-b-[2.75rem] bg-whitePink opacity-20" />
                    </div>
                </>
            }
        </div>
    );
};

export default Layout;
