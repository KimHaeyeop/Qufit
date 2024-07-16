import ComponentsTest from '@components/ComponentsTest';
import './index.css';
import UtilsTest from '@utils/UtilsTest';
import ApisTest from '@apis/ApisTest';
import AssetsTest from '@assets/svg/AssetsTest';
import DummyTest from '@dummy/DummyTest';
import HooksTest from '@hooks/HooksTest';
import ModalsTest from '@modals/ModalsTest';
import PagesTest from '@pages/PagesTest';
import RoutersTest from '@routers/RoutersTest';
import StoresTest from '@stores/StoresTest';

function App() {
    return (
        <div>
            Hello! Qufit
            <ApisTest />
            <AssetsTest />
            <ComponentsTest />
            <DummyTest />
            <HooksTest />
            <ModalsTest />
            <PagesTest />
            <RoutersTest />
            <StoresTest />
            <UtilsTest />
        </div>
    );
}

export default App;
