import { CupidIcon, XIcon } from '@assets/svg/chat';
import useChatStateStore from '@stores/chat/chatStateStore';

interface ChatRoomProps {
    id: string;
    nickname: string;
    profileImage: string;
}

const ChatRoom = ({ id, nickname, profileImage }: ChatRoomProps) => {
    const setChatState = useChatStateStore((state) => state.setChatState);

    const handleCloseButton = () => {
        setChatState([]);
    };

    return (
        <div className="flex flex-col w-full h-full py-16 pr-20">
            {/* header */}
            <div className="w-full relative flex items-center h-20 border-t-4 effect-whitePink border-x-4 border-lightPurple-3 rounded-t-[1.875rem]">
                <div className="absolute z-10 flex justify-between w-full px-12">
                    <div className="flex items-center">
                        <img src={profileImage} alt="user profile image" className="rounded-full w-14 h-14" />
                        <p className="ml-3.5 text-xl font-medium text-white truncate max-w-72">{nickname}</p>
                    </div>
                    <button onClick={handleCloseButton}>
                        <XIcon className="w-10" />
                    </button>
                </div>
                <div className="z-0 w-full h-20 rounded-t-[1.875rem] bg-whitePink opacity-30" />
            </div>
            {/* contents */}
            <div className="w-full h-full border-t-2 border-b-4 effect-pureWhite border-x-4 border-lightPurple-3 rounded-b-[1.875rem]">
                <div className="absolute z-10 flex flex-col w-full h-full px-12 pb-12">
                    <div className="flex flex-col items-center my-5 overflow-y-auto max-h-[calc(100%-6.5rem)] scrollbar-hide">
                        <div className="flex items-center w-full">
                            <div className="w-full h-1 bg-white opacity-30" />
                            <p className="w-full mx-10 text-3xl italic font-semibold text-white font-barlow opacity-80">
                                2023. 07. 12
                            </p>
                            <div className="w-full h-1 bg-white opacity-30" />
                        </div>
                        {/* 여기부터 채팅 내용이 들어가면 됨. */}
                    </div>
                    <div className="flex items-center mt-auto">
                        <input
                            placeholder="채팅을 입력하세요."
                            className="relative w-full text-white bg-transparent border-4 rounded-full outline-none h-14 caret-white border-lightPurple-3 effect-purePink pl-7 placeholder:text-white placeholder:opacity-80"
                        />
                        <button className="absolute mr-12 right-6">
                            <CupidIcon className="w-10 " />
                        </button>
                    </div>
                </div>
                <div className="z-0 w-full h-full rounded-b-[1.875rem] bg-whitePink opacity-30" />
            </div>
        </div>
    );
};

export default ChatRoom;
