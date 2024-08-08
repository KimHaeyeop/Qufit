import { PlayIcon } from '@assets/svg/video';
import VideoTimer from '@components/video/GroupVideoTimer';
import TypingText from '@components/video/TypingText';
import { PATH } from '@routers/PathConstants';
import { useState } from 'react';

interface BalanceGamePlayProps {
    onNext: () => void;
}

const BalanceGamePlay = ({ onNext }: BalanceGamePlayProps) => {
    const handleTimerEnd = () => {
        location.href = PATH.PERSONAL_VIDEO(1);
    };
    const [nextSentence, setNextSentence] = useState(false);
    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg item-center">
                <img src="/src/assets/gif/밸런스게임중.gif" alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>

            <div className="absolute bottom-[1.5rem] gap-[1rem] flex flex-col w-[calc(100%-5rem)] p-[2rem] bg-black opacity-50 min-h-[10rem]">
                <TypingText frame={50} text={'결과 '} className="w-full text-xl font-bold text-white" />
                {nextSentence && <TypingText frame={50} text={''} className="w-full text-lg text-white" />}
            </div>
        </div>
    );
};

export default BalanceGamePlay;
