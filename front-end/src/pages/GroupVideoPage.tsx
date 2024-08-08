import AudioComponent from '@components/video/AudioComponent';
import { useRoomParticipantsStore } from '@stores/video/roomStore';
import GameStartButton from '@components/game/GameStartButton';
import useRoom from '@hooks/useRoom';
import ParticipantVideo from '@components/video/ParticipantVideo';
import { useVideoRoomDetailQuery } from '@queries/useVideoQuery';
import { useState } from 'react';
import {
    useAddGameResultsStore,
    useGameResultsStore,
    useProblemsStore,
    useSetProblemsStore,
} from '@stores/video/gameStore';
import { useBalanceGameQuery } from '@apis/video/VideoApi';
import Loading from '@components/game/\bstep/Loading';
import BalanceGame from '@components/game/\bstep/BalanceGame';
import GameResult from '@components/game/\bstep/GameResult';
import GamePlay from '@components/game/\bstep/GamePlay';
import GameEnd from '@components/game/\bstep/GameEnd';

type RoomStep = 'wait' | 'active' | 'loading' | 'game' | 'play' | 'result' | 'end';

function GroupVideoPage() {
    const roomMax = 8;
    const [gameResult, setGameResult] = useState('');

    const [roomStep, setRoomStep] = useState<RoomStep>('result');
    const participants = useRoomParticipantsStore();
    const { createRoom, joinRoom, leaveRoom } = useRoom();

    const roomId = 214;

    const gameResults = useGameResultsStore();
    const addGameResults = useAddGameResultsStore();
    const problems = useProblemsStore();
    const setProblems = useSetProblemsStore();
    const { data, isSuccess } = useBalanceGameQuery();

    if (isSuccess) {
        setProblems(data.data);
    }

    const [gameStage, setGameStage] = useState(0);
    return (
        <>
            <div className="flex flex-col justify-center w-full h-screen ">
                <ParticipantVideo roomMax={roomMax} gender="m" />
                <div className="flex flex-col items-center justify-center py-4">
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
                    {roomStep === 'wait' && <GameStartButton onNext={() => setRoomStep('active')} />}
                    {/* {roomStep === 'active' && <GameIntro onNext={() => setRoomStep('loading')} />} */}
                    {roomStep === 'loading' && <Loading onNext={() => setRoomStep('game')} />}
                    {roomStep === 'game' && (
                        <BalanceGame
                            onNext={() => {
                                setGameStage((prev) => prev + 1);
                                setRoomStep('play');
                            }}
                        />
                    )}
                    {roomStep === 'play' && (
                        <GamePlay
                            id={problems[gameStage].balanceGameId}
                            title={problems[gameStage].content}
                            scenario1={problems[gameStage].scenario1}
                            scenario2={problems[gameStage].scenario2}
                            onNext={() => {
                                setRoomStep('result');
                            }}
                        />
                    )}
                    {roomStep === 'result' && (
                        <GameResult
                            onStop={() => {
                                // 타이머페이지
                                setRoomStep('end');
                            }}
                            onNext={() => {
                                setGameStage((prev) => prev + 1);
                                setRoomStep('play');
                            }}
                        />
                    )}
                    {roomStep === 'end' && <GameEnd />}
                </div>
                <ParticipantVideo roomMax={roomMax} gender="f" />
            </div>
        </>
    );
}

export default GroupVideoPage;

{
    /* <div className="hidden">
                    {participants.map((participant) => (
                        <AudioComponent
                            key={participant.nickname}
                            track={
                                participant.info.audioTrackPublications.values().next().value?.audioTrack || undefined
                            }
                        />
                    ))}
                </div> */
}
