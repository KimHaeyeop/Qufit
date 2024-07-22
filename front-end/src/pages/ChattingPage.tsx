import { useState } from 'react';
import FriendInfo from '@components/chat/FriendInfo';
import { FriendsInfoDummy } from '@dummy/Dummy';
import { EmptyChatIcon, DoorExitIcon, CupidIcon } from '@assets/svg/chat';

const ChattingPage = () => {
    const [focusButton, setFocusButton] = useState('friend');
    const [isChatState, setIsChatState] = useState([]);

    const handleButtonClick = (button: string) => {
        setFocusButton(button);
    };

    return (
        <div className="absolute z-10 flex w-full h-full">
            {/* 친구탭 */}
            <div className="flex flex-col w-full h-full px-20 py-16">
                <div className="flex justify-between px-20 mb-10">
                    <button
                        onClick={() => handleButtonClick('friend')}
                        className={`px-7 py-2.5 rounded-xl text-white text-2xl ${
                            focusButton === 'friend' ? 'font-medium bg-white bg-opacity-30' : ''
                        }`}
                    >
                        친구
                    </button>
                    <button
                        onClick={() => handleButtonClick('chat')}
                        className={`px-7 py-2.5 rounded-xl text-white text-2xl ${
                            focusButton === 'chat' ? 'font-medium bg-white bg-opacity-30' : ''
                        }`}
                    >
                        채팅 목록
                    </button>
                </div>
                {focusButton === 'friend' ? (
                    <div className="overflow-y-auto scrollbar-hide">
                        {FriendsInfoDummy.map((friend) => (
                            <FriendInfo
                                key={friend.id}
                                id={friend.id}
                                nickname={friend.nickname}
                                profileImage={friend.profileImage}
                            />
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {/* 채팅창 */}
            <div className="flex flex-col items-center justify-center w-full h-full">
                {isChatState.length === 0 ? (
                    <div className="flex flex-col items-center pb-10">
                        <EmptyChatIcon className="w-56 pt-10 pr-10" />
                        <p className="text-2xl text-white opacity-80 animate-pulse">채팅할 상대를 선택해주세요.</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ChattingPage;
