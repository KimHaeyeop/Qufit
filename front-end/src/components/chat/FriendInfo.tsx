import { StartChatIcon, DeleteFriendIcon } from '@assets/svg/chat';
import useChatStateStore from '@stores/chat/chatStateStore';
import useCloseStateStore from '@stores/chat/closeStateStore';

interface FriendInfoProps {
    id: string;
    nickname: string;
    profileImage: string;
}

const FriendInfo = ({ id, nickname, profileImage }: FriendInfoProps) => {
    const setChatState = useChatStateStore((state) => state.setChatState);
    const setIsClosed = useCloseStateStore((state) => state.setIsClosed);

    const handleStartChatButton = () => {
        setChatState([
            {
                id: id,
                nickname: nickname,
                profileImage: profileImage,
            },
        ]);
        setIsClosed(false);
    };

    return (
        <div className="flex flex-col">
            <div className="w-full h-0.5 bg-hotPink" />
            <div className="flex items-center justify-between pl-1 pr-9">
                <div className="flex items-center py-4 ">
                    <img src={profileImage} alt="user profile image" className="rounded-full w-14 h-14" />
                    <p className="text-2xl text-white mx-3.5 max-w-72 truncate">{nickname}</p>
                    <button>
                        <DeleteFriendIcon className="w-6" />
                    </button>
                </div>
                <button onClick={handleStartChatButton}>
                    <StartChatIcon className="w-8" />
                </button>
            </div>
        </div>
    );
};

export default FriendInfo;
