import AudioComponent from '@components/video/AudioComponent';
import { useRoomParticipantsStore, useSetRoomIdStore } from '@stores/video/roomStore';
import GameStartButton from '@components/game/MeetingStartButton';
import useRoom from '@hooks/useRoom';
import ParticipantVideo from '@components/video/ParticipantVideo';
import { useEffect, useRef, useState } from 'react';
import {
    Result,
    useAddGameResultsStore,
    useGameResultsStore,
    useProblemsStore,
    useResultsStore,
    useSetProblemsStore,
    useSetResultsStore,
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

type RoomStep = 'wait' | 'active' | 'loading' | 'game' | 'play' | 'result' | 'resultLoading' | 'end';
type beforeResult = {
    balanceGameChoiceId: number;
    balanceGameId: number;
    choiceContent: string;
    choiceNum: number;
    memberId: number;
    videoRoomId: number;
};
function GroupVideoPage() {
    const roomMax = 8;
    const [isMeetingStart, setIsMettingStart] = useState(false);
    const [gameResult, setGameResult] = useState('');
    const { videoRoomId } = useParams();
    const [stageResult, setStageResult] = useState(0);
    const [roomStep, setRoomStep] = useState<RoomStep>('play');
    const participants = useRoomParticipantsStore();
    const { createRoom, joinRoom, leaveRoom } = useRoom();
    const [gameStage, setGameStage] = useState(0);
    const roomId = 84;

    const setRoomId = useSetRoomIdStore();

    //게임을 그떄마다 다시 저장할까???
    // 문제번호별로 memberId, 선택값 배열을 만들자

    const results = useResultsStore();
    const setResults = useSetResultsStore();
    const problems = useProblemsStore();
    const setProblems = useSetProblemsStore();
    // 소켓 연결
    const client = useRef<StompJs.Client | null>(null);

    const { isHost } = useRoom();
    const publishSocket = (data: any) => {
        client.current?.publish({
            destination: `/pub/game/${roomId}`,
            body: JSON.stringify(data),
        });
    };
    const countValue = (targetValue: number) => {
        const count = Object.entries(results[problems[gameStage].balanceGameId]).reduce((acc, [key, value]) => {
            if (value === targetValue) {
                acc++;
            }
            return acc;
        }, 0);
        return count;
    };
    const startMeeting = () => {
        publishSocket({
            isRoomStart: true,
        });
        setIsMettingStart(true);
    };

    const startGame = () => {
        publishSocket({
            isGameStart: true,
        });
        setRoomStep('loading');
    };

    const startPlay = () => {
        publishSocket({
            isChoiceStart: true,
        });
        setGameStage((prev) => prev + 1);
        setRoomStep('play');
    };

    const endChoice = (choice: any) => {
        publishSocket(choice);
    };

    const stopGame = () => {
        publishSocket({
            getResult: true,
        });
        setRoomStep('end');
    };
    const afterSubscribe = (response: any, message: string, func: any) => {
        if (response.message === message) {
            func();
        }
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

                        afterSubscribe(response, '미팅룸 시작을 성공했습니다.', () => {
                            setIsMettingStart(true);
                        });
                        afterSubscribe(response, '게임 시작을 성공했습니다.', () => {
                            console.log(response);
                            setRoomStep('loading');
                            setProblems(response.result);
                        });
                        afterSubscribe(response, '선택지 선택을 시작했습니다.', () => {
                            console.log(response?.result);
                            setRoomStep('play');
                            {
                                !isHost && setGameStage((prev) => prev + 1);
                            }
                        });

                        afterSubscribe(response, '게임 결과를 조회했습니다.', () => {
                            const processedResult = response.result.reduce((acc, result: beforeResult) => {
                                if (!acc[result.balanceGameId]) {
                                    acc[result.balanceGameId] = {};
                                }
                                acc[result.balanceGameId][result.memberId] = result.choiceNum;
                                return acc;
                            }, {});
                            console.log(processedResult);
                            setResults(processedResult);
                        });
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
        setRoomId(roomId); //나중에 param에서 따와야함
        connect();
        return () => disConnect();
    }, []);
    console.log(results);
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
                            isStart={isMeetingStart}
                            onClick={startMeeting}
                            onNext={() => {
                                setRoomStep('active');
                            }}
                        />
                    )}
                    {roomStep === 'active' && <GameIntro onNext={startGame} />}
                    {roomStep === 'loading' && <Loading onNext={() => setRoomStep('game')} />}
                    {roomStep === 'game' && <BalanceGame onNext={startPlay} />}
                    {roomStep === 'play' && (
                        <GamePlay
                            id={problems[gameStage].balanceGameId}
                            title={problems[gameStage].content}
                            scenario1={problems[gameStage].scenario1}
                            scenario2={problems[gameStage].scenario2}
                            onNext={(choice: any) => {
                                endChoice(choice);
                                setRoomStep('resultLoading');
                            }}
                        />
                    )}
                    {roomStep === 'resultLoading' && (
                        <Loading
                            onNext={() => {
                                publishSocket({
                                    getResult: true,
                                });
                                setRoomStep('result');
                            }}
                        />
                    )}
                    {roomStep === 'result' && (
                        <GameResult
                            id={problems[gameStage].balanceGameId}
                            title={problems[gameStage].content}
                            scenario1={problems[gameStage].scenario1}
                            scenario2={problems[gameStage].scenario2}
                            onStop={stopGame}
                            scenario1Cnt={countValue(1)}
                            scenario2Cnt={countValue(2)}
                            nullCnt={countValue(0)}
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
