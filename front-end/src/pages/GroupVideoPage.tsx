import VideoComponent from '@components/video/VideoComponent';
import AudioComponent from '@components/video/AudioComponent';
import EmptyVideo from '@components/video/EmptyVideo';
import { useRoomManagerNameStore, useRoomParticipantsStore } from '@stores/video/roomStore';
import GameStartButton from '@components/video/GameStartButton';
import games from '@dummy/balance_game.json';
import { GROUP_VIDEO_END_SEC } from '@components/video/VideoConstants';
import { PATH } from '@routers/PathConstants';
import VideoTimer from '@components/video/GroupVideoTimer';
import useRoom from '@hooks/useRoom';
import { useVideoRoomDetailQuery } from '@queries/useVideoQuery';
import BalanceGameGroup from '@components/game/GameChoiceGroup';
import BalanceGameChoice from '@components/game/GameChoice';
import { useState } from 'react';
import GameTimer from '@components/game/GameTimer';
import { useGameQuery, useRegistGameResultMutation } from '@queries/useGameQuery';
import { useAddGameResultsStore, useGameResultsStore } from '@stores/video/gameStore';
import { FemaleIcon, MaleIcon } from '@assets/svg/video';
import GameResultCard from '@components/game/GameResultCard';

type GameStep = 'wait' | 'game' | 'result';

function GroupVideoPage() {
    const roomMax = 8;
    const [gameResult, setGameResult] = useState('');

    const [step, setStep] = useState<GameStep>('game');
    let maleIdx = 0;
    let femaleIdx = 0;
    const managerName = useRoomManagerNameStore();
    const participants = useRoomParticipantsStore();
    // const { createRoom, joinRoom, leaveRoom } = useRoom();
    const roomId = 124;

    const { data } = useGameQuery();
    const registGameResult = useRegistGameResultMutation();

    const handleTimerEnd = () => {
        location.href = PATH.PERSONAL_VIDEO(1);
    };

    const gameResults = useGameResultsStore();
    const addGameResults = useAddGameResultsStore();
    console.log(gameResults);

    const [gameStage, setGameStage] = useState(1);
    return (
        <>
            <div className="flex flex-col items-center justify-between w-full h-screen">
                <div className="flex w-full gap-4">
                    {participants.map((participant) => {
                        maleIdx++;
                        return (
                            participant.gender === 'm' && (
                                <VideoComponent
                                    key={participant.nickname}
                                    track={
                                        participant.info.videoTrackPublications.values().next().value?.videoTrack ||
                                        undefined
                                    }
                                    isManager={participant.nickname === managerName}
                                    participateName={participant.nickname!}
                                />
                            )
                        );
                    })}
                    {Array(roomMax / 2 - maleIdx)
                        .fill(0)
                        .map(() => (
                            <EmptyVideo />
                        ))}
                </div>
                <div>
                    {/* <div className="flex flex-col gap-4">
                        <button onClick={createRoom}>생성하기</button>

                        <button
                            onClick={() => {
                                joinRoom(roomId);
                            }}
                        >
                            입장하기
                        </button>
                        <button onClick={() => leaveRoom(roomId)}>나가기</button>
                    </div> */}

                    {/* <VideoTimer
                        endSec={GROUP_VIDEO_END_SEC}
                        afterFunc={() => {
                            handleTimerEnd();
                        }}
                    /> */}
                    {/* <GameStartButton /> */}

                    {/* 전역스토어에 값을 가지고 있어 */}
                    {step === 'game' && (
                        <div className="flex flex-col items-center text-4xl">
                            <p>{games[gameStage].content}</p>
                            <BalanceGameGroup
                                value={gameResult}
                                onChange={(e) => setGameResult(e.target.value)}
                                name={'game'}
                            >
                                <BalanceGameChoice value="1">{games[gameStage].scenario1}</BalanceGameChoice>
                                <GameTimer
                                    endSec={3}
                                    afterFunc={() => {
                                        // registGameResult.mutate();
                                        setStep('result');
                                    }}
                                />
                                <BalanceGameChoice value="2">{games[gameStage].scenario2}</BalanceGameChoice>
                            </BalanceGameGroup>
                        </div>
                    )}
                    {step === 'result' && (
                        <div className="flex flex-col items-center">
                            <p className="text-3xl text-white">밸런스 게임 결과</p>
                            <div className="flex gap-10">
                                <GameResultCard isMore={true} scenario={games[gameStage].scenario1} />
                                <GameResultCard isMore={false} scenario={games[gameStage].scenario1} />
                            </div>
                            <button
                                onClick={() => {
                                    setGameStage((prev) => prev + 1);
                                    setStep('game');
                                }}
                            >
                                다음 밸런스 게임 시작하기
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex w-full gap-4">
                    {participants.map((participant) => {
                        femaleIdx++;
                        return (
                            participant.gender === 'f' && (
                                <VideoComponent
                                    key={participant.nickname}
                                    track={
                                        participant.info.videoTrackPublications.values().next().value?.videoTrack ||
                                        undefined
                                    }
                                    isManager={participant.nickname === managerName}
                                    participateName={participant.nickname!}
                                />
                            )
                        );
                    })}
                    {Array(roomMax / 2 - femaleIdx)
                        .fill(0)
                        .map(() => (
                            <EmptyVideo />
                        ))}
                </div>
                <div className="hidden">
                    {participants.map((participant) => (
                        <AudioComponent
                            key={participant.nickname}
                            track={
                                participant.info.audioTrackPublications.values().next().value?.audioTrack || undefined
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default GroupVideoPage;
