import { CupidIcon, XIcon, EmptyChatIcon } from '@assets/svg/chat';
import useChatStateStore from '@stores/chat/chatStateStore';
import useCloseStateStore from '@stores/chat/closeStateStore';

interface ChatRoomProps {
    id: string;
    nickname: string;
    profileImage: string;
}

const ChatRoom = ({ id, nickname, profileImage }: ChatRoomProps) => {
    const isClosed = useCloseStateStore((state) => state.isClosed);
    const setIsClosed = useCloseStateStore((state) => state.setIsClosed);

    const chatState = useChatStateStore((state) => state.chatState);
    const setChatState = useChatStateStore((state) => state.setChatState);

    const handleCloseButton = () => {
        setIsClosed(true);

        setTimeout(() => {
            setChatState([
                {
                    id: '',
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
                    chatState[0].id === '' ? 'opacity-100' : 'opacity-0 scale-95'
                } md:invisible sm:invisible xs:invisible`}
            >
                <EmptyChatIcon className="w-56 pr-10" />
                <p className="absolute text-2xl text-center text-white bottom-8 w-80 opacity-80 animate-pulse">
                    채팅할 상대를 선택해주세요.
                </p>
            </div>
            <div
                className={`flex flex-col w-full h-full transition-all duration-200 ease-out  ${
                    isClosed || chatState[0].id === '' ? 'scale-95 opacity-0' : 'opacity-100'
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
                                {/* 여기부터 채팅 내용이 들어가면 됨. */}
                            </div>
                            <div className="flex items-center mt-auto">
                                <input
                                    placeholder="채팅을 입력하세요."
                                    className="relative w-full pr-20 text-white bg-transparent border-4 rounded-full outline-none h-14 caret-white border-lightPurple-3 effect-purePink pl-7 placeholder:text-white placeholder:opacity-80 lg:h-12 md:h-20 md:text-xl md:pr-24 sm:h-20 sm:text-xl sm:pr-24 xs:h-20 xs:text-xl xs:pr-24"
                                />
                                <button className="absolute mr-12 right-6 xs:mr-6">
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
