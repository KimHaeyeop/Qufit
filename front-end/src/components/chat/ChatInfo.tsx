import { DoorExitIcon } from '@assets/svg/chat';

interface ChatInfoProps {
    id: string;
    nickname: string;
    profileImage: string;
    lastMessage: string;
    unreadCount: number;
}

const ChatInfo = ({ id, nickname, profileImage, lastMessage, unreadCount }: ChatInfoProps) => {
    return (
        <div className="flex flex-col">
            <div className="w-full h-0.5 bg-hotPink" />
            <div className="flex items-center justify-between pl-1">
                <div className="flex items-center py-4 ">
                    <img src={profileImage} alt="user profile image" className="rounded-full w-14 h-14" />
                    <div className="flex flex-col mx-3.5 ">
                        <p className="text-2xl text-white truncate max-w-72">{nickname}</p>
                        <p className="mt-2 text-xl font-light text-white truncate max-w-96">{lastMessage}</p>
                    </div>
                </div>
                <div className="flex">
                    {unreadCount > 0 && (
                        <div className="flex items-center justify-center w-8 h-8 mr-5 font-bold text-center text-white bg-white rounded-full bg-opacity-40">
                            {unreadCount}
                        </div>
                    )}
                    <button>
                        <DoorExitIcon className="w-8" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInfo;
