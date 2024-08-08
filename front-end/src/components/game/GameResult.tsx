import { PlayIcon } from '@assets/svg/video';
import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';
import VideoTimer from '@components/video/GroupVideoTimer';
import TypingText from '@components/game/TypingText';
import useTimer from '@hooks/useTimer';
import { PATH } from '@routers/PathConstants';
import { useState } from 'react';

interface GameResultProps {
    onNext: () => void;
    title: string;
    senario1: string;
    senario2: string;
}

const GameResult = ({ id, title, senario1, senario2, onNext }: GameResultProps) => {
    return (
        <>
            <div className="flex justify-center rounded-lg item-center">
                <img src="/src/assets/gif/밸런스게임중.gif" alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>

            <div className="absolute bottom-[1.5rem] gap-[1rem] flex flex-col w-[calc(100%-5rem)] p-[2rem] bg-black opacity-50 min-h-[10rem]">
                <TypingText
                    frame={50}
                    text={'[결과]  '}
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
        </>
    );
};

export default GameResult;
