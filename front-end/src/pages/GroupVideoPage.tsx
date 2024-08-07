import VideoComponent from '@components/video/VideoComponent';
import AudioComponent from '@components/video/AudioComponent';
import EmptyVideo from '@components/video/EmptyVideo';
import { useRoomParticipantsStore } from '@stores/video/roomStore';
import GameStartButton from '@components/video/GameStartButton';
import games from '@dummy/balance_game.json';
import { GROUP_VIDEO_END_SEC } from '@components/video/VideoConstants';
import { PATH } from '@routers/PathConstants';
import VideoTimer from '@components/video/GroupVideoTimer';
import useRoom from '@hooks/useRoom';
import ParticipantVideo from '@components/video/ParticipantVideo';
import { useVideoRoomDetailQuery } from '@queries/useVideoQuery';
import BalanceGameGroup from '@components/game/GameChoiceGroup';
import BalanceGameChoice from '@components/game/GameChoice';
import { useState } from 'react';
import GameTimer from '@components/game/GameTimer';
import { useGameQuery, useRegistGameResultMutation } from '@queries/useGameQuery';
import { useAddGameResultsStore, useGameResultsStore } from '@stores/video/gameStore';
import { FemaleIcon, MaleIcon, PlayIcon } from '@assets/svg/video';
import GameResultCard from '@components/game/GameResultCard';

type RoomStep = 'wait' | 'active' | 'game' | 'result';

function GroupVideoPage() {
    const roomMax = 8;
    const [gameResult, setGameResult] = useState('');

    const [roomStep, setRoomStep] = useState<RoomStep>('wait');
    const participants = useRoomParticipantsStore();
    const { createRoom, joinRoom, leaveRoom } = useRoom();
    const roomId = 214;

    const handleTimerEnd = () => {
        location.href = PATH.PERSONAL_VIDEO(1);
    };

    const gameResults = useGameResultsStore();
    const addGameResults = useAddGameResultsStore();
    console.log(gameResults);

    const [gameStage, setGameStage] = useState(1);
    return (
        <>
            <div className="flex flex-col justify-center w-full h-screen items-a">
                <ParticipantVideo roomMax={roomMax} gender="m" />
                <div className="flex flex-col items-center justify-center">
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
                    {roomStep === 'wait' && (
                        <>
                            <GameStartButton onNext={() => setRoomStep('active')} />
                        </>
                    )}
                    {roomStep === 'active' && (
                        <>
                            <div className="absolute z-20">
                                <VideoTimer
                                    endSec={50 * 60}
                                    afterFunc={() => {
                                        handleTimerEnd();
                                    }}
                                />
                            </div>
                            <div className="relative p-3 bg-black aspect-gameBg">
                                <div className="flex justify-center rounded-lg item-center">
                                    <img
                                        src="/src/assets/gif/밸런스게임 시작전 화면.gif"
                                        className="w-full h-full rounded-2xl"
                                    />
                                </div>

                                <img
                                    src="/src/assets/png/BALANCEGAME.png"
                                    className="absolute top-[8rem] left-1/2 -translate-x-1/2"
                                />

                                <button className="flex items-center animate-bounce absolute bottom-[8rem] left-1/2 -translate-x-1/2">
                                    <PlayIcon width={'2rem'} />
                                    <p className="text-2xl font-bold text-white">CLICK START</p>
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <ParticipantVideo roomMax={roomMax} gender="f" />
                {/* <div className="hidden">
                    {participants.map((participant) => (
                        <AudioComponent
                            key={participant.nickname}
                            track={
                                participant.info.audioTrackPublications.values().next().value?.audioTrack || undefined
                            }
                        />
                    ))}
                </div> */}
            </div>
        </>
    );
}

export default GroupVideoPage;
