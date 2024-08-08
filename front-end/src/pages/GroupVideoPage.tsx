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
import { useState } from 'react';
import GameTimer from '@components/game/GameTimer';
import { useAddGameResultsStore, useGameResultsStore } from '@stores/video/gameStore';
import { FemaleIcon, MaleIcon, PlayIcon } from '@assets/svg/video';
import BalanceGameIntro from '@components/video/BalanceGameIntro';
import BalanceGamePlay from '@components/video/BalanceGame';
import TypingText from '@components/video/TypingText';
import BalanceGameResult from '@components/video/BalanceGameResult';
import BalanceGame from '@components/video/BalanceGamePlay';

type RoomStep = 'wait' | 'active' | 'game' | 'play' | 'result';

function GroupVideoPage() {
    const roomMax = 8;
    const [gameResult, setGameResult] = useState('');

    const [roomStep, setRoomStep] = useState<RoomStep>('active');
    const participants = useRoomParticipantsStore();
    const { createRoom, joinRoom, leaveRoom } = useRoom();
    const roomId = 214;

    const gameResults = useGameResultsStore();
    const addGameResults = useAddGameResultsStore();

    const [gameStage, setGameStage] = useState(1);
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
                    {roomStep === 'active' && <BalanceGameIntro onNext={() => setRoomStep('game')} />}
                    {roomStep === 'game' && <BalanceGame onNext={() => setRoomStep('play')} />}
                    {roomStep === 'play' && <BalanceGamePlay onNext={() => setRoomStep('result')} />}
                    {roomStep === 'result' && <BalanceGameResult onNext={() => setRoomStep('game')} />}
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
