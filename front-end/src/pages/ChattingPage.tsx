import FriendInfo from '@components/chat/FriendInfo';
import ChatInfo from '@components/chat/ChatInfo';
import ChatRoom from '@components/chat/ChatRoom';
import { FriendsInfoDummy } from '@dummy/Dummy';
import useTabStateStore from '@stores/chat/tabStateStore';
import useChatStateStore from '@stores/chat/chatStateStore';

const ChattingPage = () => {
    const buttonFocus = useTabStateStore((state) => state.buttonFocus);
    const setButtonFocus = useTabStateStore((state) => state.setButtonFocus);

    const chatState = useChatStateStore((state) => state.chatState);

    return (
        <div className="absolute z-10 flex w-full h-full">
            {/* 친구탭 */}
            <div className="flex flex-col w-full h-full px-20 py-16">
                <div className="flex justify-between px-20 mb-10">
                    <button
                        onClick={() => setButtonFocus('friend')}
                        className={`px-7 py-2.5 rounded-xl text-white text-2xl ${
                            buttonFocus === 'friend' ? 'font-medium bg-white bg-opacity-30' : ''
                        }`}
                    >
                        친구
                    </button>
                    <button
                        onClick={() => setButtonFocus('chat')}
                        className={`px-7 py-2.5 rounded-xl text-white text-2xl ${
                            buttonFocus === 'chat' ? 'font-medium bg-white bg-opacity-30' : ''
                        }`}
                    >
                        채팅 목록
                    </button>
                </div>
                {buttonFocus === 'friend' ? (
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
                    <div className="overflow-y-auto scrollbar-hide">
                        {FriendsInfoDummy.map((chat) => (
                            <ChatInfo
                                key={chat.id}
                                id={chat.id}
                                nickname={chat.nickname}
                                profileImage={chat.profileImage}
                                lastMessage={chat.chatRoom[0].lastMessage}
                                unreadCount={chat.chatRoom[0].unreadCount}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* 채팅창 */}
            <div className="relative flex flex-col items-center justify-center w-full h-full">
                <div className="w-full h-full py-16 pr-20">
                    <ChatRoom
                        id={chatState[0].id}
                        nickname={chatState[0].nickname}
                        profileImage={chatState[0].profileImage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChattingPage;
