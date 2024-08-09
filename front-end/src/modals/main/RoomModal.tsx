interface CreateRoomModalProps {
    onClose: () => void;
    joinRoom: (roomId: number) => void;
    roomId: number;
}

export const CreateRoomModal = ({ onClose }: CreateRoomModalProps) => {
    return (
        <div>
            <div>하위 나는 방 만들기 모달</div>
            <button onClick={onClose}>나가</button>
        </div>
    );
};

export const RoomEntryModal = ({ onClose, joinRoom, roomId }: CreateRoomModalProps) => {
    return (
        <div>
            <div className="text-white">하위 나는 방 입장 모달</div>
            <button
                onClick={() => {
                    joinRoom(roomId);
                }}
                className="mr-10 text-lg text-white bg-pink"
            >
                입장할게
            </button>
            <button onClick={onClose}>나가</button>
        </div>
    );
};
