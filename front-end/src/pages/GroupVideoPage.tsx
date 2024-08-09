import AudioComponent from '@components/video/AudioComponent';
import { useRoomParticipantsStore } from '@stores/video/roomStore';
import GameStartButton from '@components/game/MeetingStartButton';
import useRoom from '@hooks/useRoom';
import ParticipantVideo from '@components/video/ParticipantVideo';
import { useEffect, useRef, useState } from 'react';
import {
    useAddGameResultsStore,
    useGameResultsStore,
    useProblemsStore,
    useSetProblemsStore,
} from '@stores/video/gameStore';
import Loading from '@components/game/\bstep/Loading';
import BalanceGame from '@components/game/\bstep/BalanceGame';
import GameResult from '@components/game/\bstep/GameResult';
import GamePlay from '@components/game/\bstep/GamePlay';
import GameEnd from '@components/game/\bstep/GameEnd';
import * as StompJs from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { qufitAcessTokenA } from '@apis/axios';
import MeetingStartButton from '@components/game/MeetingStartButton';
import GameIntro from '@components/game/\bstep/GameIntro';

type RoomStep = 'wait' | 'active' | 'loading' | 'game' | 'play' | 'result' | 'end';

function GroupVideoPage() {
    const roomMax = 8;
    const [isStart, setIsStart] = useState(false);
    const [gameResult, setGameResult] = useState('');
    const { videoRoomId } = useParams();

    const [roomStep, setRoomStep] = useState<RoomStep>('wait');
    const participants = useRoomParticipantsStore();
    const { createRoom, joinRoom, leaveRoom } = useRoom();

    const roomId = 75;

    const gameResults = useGameResultsStore();
    const addGameResults = useAddGameResultsStore();
    const problems = useProblemsStore();
    const setProblems = useSetProblemsStore();
    // 소켓 연결
    const client = useRef<StompJs.Client | null>(null);

    const startMeeting = () => {
        client.current?.publish({
            destination: `/pub/game/${roomId}`,
            body: JSON.stringify({
                isRoomStart: true,
            }),
        });
        setIsStart(true);
    };
    const connect = () => {
        try {
            client.current = new StompJs.Client({
                brokerURL: `ws://i11a209.p.ssafy.io:8080/stomp/chat`,
                connectHeaders: {
                    Authorization: `Bearer ${qufitAcessTokenA}`,
                },
                debug: function (str) {
                    console.log('소켓 디버그:', str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    client.current?.subscribe(`/sub/game/${roomId}`, (message) => {
                        const response = JSON.parse(message.body);
                        if (response.message === '미팅룸 시작을 성공했습니다.') {
                            setIsStart(true);
                        }
                        console.log(response);
                    });
                },
            });

            if (client.current) {
                client.current.activate();
            } else {
                console.log('클라이언트가 초기화되지 않았습니다.');
            }
        } catch (err) {
            console.log(err);
        }
    };
    // 연결 끊기
    const disConnect = () => {
        if (client.current === null) {
            return;
        }
        client.current.deactivate();
    };
    useEffect(() => {
        connect();

        return () => disConnect();
    }, []);
    const [gameStage, setGameStage] = useState(0);
    return (
        <>
            <div className="flex flex-col justify-center w-full h-screen ">
                <ParticipantVideo roomMax={roomMax} gender="m" />
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="flex flex-col gap-4">
                        <button onClick={createRoom}>생성하기</button>

                        <button
                            onClick={() => {
                                joinRoom(roomId);
                            }}
                        >
                            입장하기
                        </button>
                        <button onClick={() => leaveRoom(roomId)}>나가기</button>
                    </div>
                    {roomStep === 'wait' && (
                        <MeetingStartButton
                            isStart={isStart}
                            onClick={startMeeting}
                            onNext={() => {
                                setRoomStep('active');
                            }}
                        />
                    )}
                    {roomStep === 'active' && <GameIntro onNext={() => setRoomStep('loading')} />}
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
