import { GameHeartIcon } from '@assets/svg/video';
import { GENDER } from '@components/auth/SignupConstants';
import SingleTag from '@components/auth/SingleTag';
import SingleTagGroup from '@components/auth/SingleTagGroup';
import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';
import ChoiceTimer from '@components/game/ChoiceTimer';
import TypingText from '@components/game/TypingText';
import useTimer from '@hooks/useTimer';
import { ChangeEvent, useEffect, useState } from 'react';

interface GamePlayProps {
    onNext: () => void;
    title: string;
    scenario1?: string;
    scenario2?: string;
    id: number;
}
const GamePlay = ({ id, title, scenario1, scenario2, onNext }: GamePlayProps) => {
    const [nextSentence, setNextSentence] = useState(false);
    const [answer, setAnswer] = useState('0');
    const [startTimer, setStartTimer] = useState(false);

    const handleTimerEnd = () => {
        //선택지 요청보내기
        onNext();
    };

    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg item-center">
                <img src="/src/assets/gif/밸런스게임중.gif" alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>
            {startTimer && (
                <div className="absolute top-[2rem] left-[2rem] ">
                    <ChoiceTimer onEnd={handleTimerEnd} />
                </div>
            )}

            <div className="absolute bottom-[1.5rem] gap-[1rem] flex flex-col w-[calc(100%-5rem)] p-[2rem] bg-black opacity-50 min-h-[10rem]">
                <TypingText
                    frame={50}
                    text={'[밸런스의 마법사]  '}
                    afterFunc={() => {
                        setNextSentence(true);
                    }}
                    className="w-full text-xl font-bold text-white"
                />
                {nextSentence && (
                    <TypingText
                        frame={80}
                        text={title + '  '}
                        afterFunc={() => {
                            setStartTimer(true);
                        }}
                        className="w-full text-lg text-white"
                    />
                )}
                {startTimer && (
                    <RadioGroup
                        className="border-2 border-white rounded-lg absolute z-100 -top-4 right-0 -translate-y-full flex flex-col items-start py-[1.5rem] gap-1 px-[1rem] bg-black opacity-50"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        name={''}
                    >
                        {[scenario1, scenario2].map((scenario) => (
                            <Radio
                                value={scenario!}
                                className="flex  opacity-90 p-2 items-center text-xl  text-white justify-center   hover:border-lightPurple-6  has-[:checked]:bg-lightPurple-2 has-[:checked]:animate-pulse"
                            >
                                {scenario}
                            </Radio>
                        ))}
                    </RadioGroup>
                )}
            </div>
        </div>
    );
};

export default GamePlay;
