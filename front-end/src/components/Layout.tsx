import TempNavbar from '@components/TempNavbar';
import { Outlet } from 'react-router-dom';

const Layout = ({ hasHeader }: { hasHeader: boolean }) => {
    return (
        <div className="h-full">
            {/* TODO: TempNavbar는 헤더 만들면 삭제 */}
            <TempNavbar />
            {hasHeader && <header> 헤더</header>}
            <Outlet />
        </div>
    );
};

export default Layout;
