import { create } from 'zustand';

interface UserInfoProps {
    id: string;
    nickname: string;
    profileImage: string;
}

interface ChatStateProps {
    chatState: UserInfoProps[];
    setChatState: (list: UserInfoProps[]) => void;
}

const useChatStateStore = create<ChatStateProps>((set) => ({
    chatState: [],
    setChatState: (list: UserInfoProps[]) =>
        set(() => ({
            chatState: list,
        })),
}));

export default useChatStateStore;
