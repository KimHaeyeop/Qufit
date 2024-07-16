import { Outlet } from 'react-router-dom';

const Layout = ({ hasHeader }: { hasHeader: boolean }) => {
    return (
        <div>
            {hasHeader && <header> 헤더</header>}
            <Outlet />
        </div>
    );
};

export default Layout;
