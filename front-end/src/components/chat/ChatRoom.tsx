import { CupidIcon, XIcon, EmptyChatIcon } from '@assets/svg/chat';
import useChatStateStore from '@stores/chat/chatStateStore';
import useCloseStateStore from '@stores/chat/closeStateStore';
import * as StompJs from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';

interface ChatRoomProps {
    id: number;
    nickname: string;
    profileImage: string;
}

const ChatRoom = ({ id, nickname, profileImage }: ChatRoomProps) => {
    const isClosed = useCloseStateStore((state) => state.isClosed);
    const setIsClosed = useCloseStateStore((state) => state.setIsClosed);

    const chatState = useChatStateStore((state) => state.chatState);
    const setChatState = useChatStateStore((state) => state.setChatState);

    const client = useRef<StompJs.Client | null>(null);
    const [chat, setChat] = useState(''); // 입력된 chat을 받을 변수
    const [chatList, setChatList] = useState([]); // 채팅 기록

    const msgBox = chatList.map((item, idx) => {
        if (item.senderId === 4) {
            return (
                <div key={idx} className="font-bold bg-lightPurple-1">
                    <span>{item.content}</span>
                </div>
            );
        } else {
            return (
                <div key={idx}>
                    <span>{item.content}</span>
                </div>
            );
        }
    });

    const callback = function (message: { body: string }) {
        if (message.body) {
            console.log('수신된 메시지:', message.body);
            let msg = JSON.parse(message.body);
            setChatList((chats) => [...chats, msg]);
            console.log('채팅 리스트:', chatList);
        } else {
            console.log('빈 메시지 수신');
        }
    };

    const connect = () => {
        // 소켓 연결
        try {
            client.current = new StompJs.Client({
                brokerURL: 'ws://i11a209.p.ssafy.io:8080/stomp/chat',
                debug: function (str) {
                    console.log('소켓 디버그:', str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    client.current?.publish({
                        destination: `/pub/chat.enterRoom/1`,
                        body: JSON.stringify({ pageSize: 20 }),
                    });
                    client.current?.subscribe(`/user/4/sub/chatroom.1`, (message) => {
                        if (message.body) {
                            const response = JSON.parse(message.body);
                            const messages = response.messages;
                            setChatList(messages);
                        }
                    });
                    client.current?.subscribe(`/sub/chatroom.1`, callback);
                },
            });

            console.log('클라:', client.current);

            if (client.current) {
                client.current.activate();
            } else {
                console.log('클라이언트가 초기화되지 않았습니다.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const disConnect = () => {
        // 연결 끊기
        if (client.current === null) {
            return;
        }
        client.current.deactivate();
    };

    const sendChat = () => {
        if (chat === '') {
            return;
        }

        client.current?.publish({
            destination: `/pub/chat.sendMessage/1`,
            body: JSON.stringify({
                senderId: 4,
                chatRoomId: 1,
                content: chat,
            }),
        });

        setChat('');
    };

    useEffect(() => {
        if (id !== 0) {
            connect();
            console.log('연결뀨!');
        }

        return () => (disConnect(), console.log('연결끊기!'));
    }, [id]);

    const onChangeChat = (e) => {
        setChat(e.target.value);
    };

    const handleCloseButton = () => {
        setIsClosed(true);

        setTimeout(() => {
            setChatState([
                {
                    id: 0,
                    nickname: '',
                    profileImage: '',
                },
            ]);
        }, 200);
    };

    return (
        <>
            <div
                className={`absolute flex flex-col items-center pb-10 left-1/4 top-1/3  ${
                    chatState[0].id === 0 ? 'opacity-100' : 'opacity-0 scale-95'
                } md:invisible sm:invisible xs:invisible`}
            >
                <EmptyChatIcon className="w-56 pr-10" />
                <p className="absolute text-2xl text-center text-white bottom-8 w-80 opacity-80 animate-pulse">
                    채팅할 상대를 선택해주세요.
                </p>
            </div>
            <div
                className={`flex flex-col w-full h-full transition-all duration-200 ease-out  ${
                    isClosed || chatState[0].id === 0 ? 'scale-95 opacity-0' : 'opacity-100'
                } md:transition-none sm:transition-none xs:transition-none`}
            >
                <div className="flex flex-col w-full h-full z-20 md:bg-chatPageBg md:effect-whitePink md:rounded-b-[3rem] sm:bg-chatPageBg sm:effect-whitePink sm:rounded-b-[3rem] xs:bg-chatPageBg xs:effect-whitePink xs:rounded-b-[3rem]">
                    {/* header */}
                    <div className="w-full relative flex items-center h-20 border-t-4 effect-whitePink border-x-4 py-6 border-lightPurple-3 rounded-t-[1.875rem] lg:h-16 md:rounded-none md:border-none md:effect-none md:py-12 sm:rounded-none sm:border-none sm:effect-none sm:py-12 xs:rounded-none xs:border-none xs:effect-none xs:py-12 ">
                        <div className="absolute z-10 flex justify-between w-full px-12 lg:px-10 xs:px-6">
                            <div className="flex items-center">
                                <img
                                    src={profileImage}
                                    alt="user profile image"
                                    className="rounded-full w-14 h-14 lg:w-10 lg:h-10"
                                />
                                <p className="ml-3.5 text-xl font-medium text-white truncate max-w-72 lg:text-lg">
                                    {nickname}
                                </p>
                            </div>
                            <button onClick={handleCloseButton}>
                                <XIcon className="w-10" />
                            </button>
                        </div>
                    </div>
                    {/* contents */}
                    <div className="w-full h-full border-t-2 border-b-4 effect-pureWhite border-x-4 border-lightPurple-3 rounded-b-[1.875rem] md:border-none md:effect-none sm:border-none sm:effect-none xs:border-none xs:effect-none">
                        <div className="absolute z-10 flex flex-col w-full h-full px-12 pb-12 lg:px-10 lg:pb-10 md:h-[calc(100%-5.5rem)] sm:h-[calc(100%-5.5rem)] xs:h-[calc(100%-5.5rem)] xs:px-6">
                            <div className="flex flex-col items-center my-5 overflow-y-auto max-h-[calc(100%-6.5rem)] scrollbar-hide lg:max-h-[calc(100%-5rem)] md:max-h-[calc(100%-8rem)] md:my-0 sm:max-h-[calc(100%-8rem)] sm:my-0 xs:max-h-[calc(100%-8rem)] xs:my-0">
                                <div className="flex items-center w-full">
                                    <div className="w-full h-1 bg-white opacity-30 xs:w-32" />
                                    <p className="w-full mx-10 text-3xl italic font-semibold text-center text-white font-barlow opacity-80 lg:text-2xl md:text-4xl sm:text-4xl xs:text-3xl xs:mx-4">
                                        2023. 07. 12
                                    </p>
                                    <div className="w-full h-1 bg-white opacity-30 xs:w-32" />
                                </div>
                                {msgBox}
                            </div>
                            <div className="flex items-center mt-auto">
                                <input
                                    type="text"
                                    value={chat}
                                    onChange={onChangeChat}
                                    onKeyDown={(e) => {
                                        e.key === 'Enter' && sendChat();
                                    }}
                                    placeholder="채팅을 입력하세요."
                                    className="relative w-full pr-20 text-white bg-transparent border-4 rounded-full outline-none h-14 caret-white border-lightPurple-3 effect-purePink pl-7 placeholder:text-white placeholder:opacity-80 lg:h-12 md:h-20 md:text-xl md:pr-24 sm:h-20 sm:text-xl sm:pr-24 xs:h-20 xs:text-xl xs:pr-24"
                                />
                                <button onClick={sendChat} className="absolute mr-12 right-6 xs:mr-6">
                                    <CupidIcon className="w-10 md:w-14 sm:w-14 xs:w-14" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatRoom;
