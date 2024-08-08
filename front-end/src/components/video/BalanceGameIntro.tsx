import { PlayIcon } from '@assets/svg/video';
import VideoTimer from '@components/video/GroupVideoTimer';
import { PATH } from '@routers/PathConstants';

interface BalanceGameIntroProps {
    onNext: () => void;
}

const BalanceGameIntro = ({ onNext }: BalanceGameIntroProps) => {
    const handleTimerEnd = () => {
        location.href = PATH.PERSONAL_VIDEO(1);
    };
    return (
        <>
            <div className="absolute z-20">
                <VideoTimer
                    endSec={50 * 60}
                    afterFunc={() => {
                        handleTimerEnd();
                    }}
                />
            </div>
            <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
                <div className="flex justify-center rounded-lg item-center aspect-gameBg">
                    <img src="/src/assets/gif/밸런스게임시작전.gif" className="w-full h-full rounded-2xl" />
                </div>

                <img src="/src/assets/png/BALANCEGAME.png" className="absolute top-[8rem] left-1/2 -translate-x-1/2" />

                <button
                    onClick={onNext}
                    className="flex items-center animate-bounce absolute bottom-[8rem] left-1/2 -translate-x-1/2"
                >
                    <PlayIcon width={'2rem'} />
                    <p className="text-2xl font-bold text-white">CLICK START</p>
                </button>
            </div>
        </>
    );
};

export default BalanceGameIntro;
