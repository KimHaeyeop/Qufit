import { PlayIcon } from '@assets/svg/video';
import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';
import VideoTimer from '@components/video/GroupVideoTimer';
import TypingText from '@components/game/TypingText';
import useTimer from '@hooks/useTimer';
import { PATH } from '@routers/PathConstants';
import { useState } from 'react';
import ChoiceGroup from '@components/game/ChoiceGroup';
import Choice from '@components/game/Choice';

interface GameResultProps {
    onStop?: () => void;
    onNext?: () => void;
    title?: string;
    senario1?: string;
    senario2?: string;
}

const GameResult = ({ id, title, senario1, senario2, onNext, onStop }: GameResultProps) => {
    const [answer, setAnswer] = useState('12');

    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg item-center">
                <img src="/src/assets/gif/밸런스게임중.gif" alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>

            <div className="absolute bottom-[1.5rem] gap-[1rem] flex flex-col w-[calc(100%-5rem)] p-[2rem] bg-black opacity-50 min-h-[10rem]">
                <TypingText frame={50} text={'[결과]  '} className="w-full text-xl font-bold text-white" />

                <TypingText frame={80} text={title + '  '} className="w-full text-lg text-white" />
                <div
                    onClick={onStop}
                    className="border-2 border-white rounded-lg absolute z-100 -top-4 right-0 -translate-y-full flex flex-col items-start py-[1.5rem] gap-1 px-[1rem] bg-black opacity-50"
                >
                    <div className="w-full  opacity-90 p-2 items-center text-xl  text-white justify-center   hover:bg-lightPurple-2  has-[:checked]:animate-pulse">
                        그만할래.
                    </div>
                    <div
                        onClick={onNext}
                        className="w-full   opacity-90 p-2 items-center text-xl  text-white justify-center   hover:bg-lightPurple-2  has-[:checked]:animate-pulse"
                    >
                        한번 더 하고싶어!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameResult;
