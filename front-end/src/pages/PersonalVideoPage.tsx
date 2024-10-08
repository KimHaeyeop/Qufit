import ParticipantVideo from '@components/video/ParticipantVideo';
import PersonalResult from '@components/video/PersonalResult';
import PersonalVideoTimer from '@components/video/PersonalVideoTimer';
import useModal from '@hooks/useModal';
import { useOtherIdxStore, useRoomParticipantsStore, useSetOtherIdxStore } from '@stores/video/roomStore';
import { useEffect, useRef, useState } from 'react';
import { PERSONAL_VIDEO_END_SEC } from '@components/game/Constants';
import useRoom from '@hooks/useRoom';
import { useNavigate, useParams } from 'react-router-dom';
import useMember from '@hooks/useMember';
import MoveRoomModal from '@modals/video/MoveRoomModal';
import { instance } from '@apis/axios';
import { PATH } from '@routers/PathConstants';
import * as StompJs from '@stomp/stompjs';
import { afterSubscribe, connect, disConnect, publishSocket } from '@utils/websocketUtil';
import { useProblemsStore, useResultsStore } from '@stores/video/gameStore';
import { AddFriendsIcon, AddedFriendIcon } from '@assets/svg';

const PersonalVideoPage = () => {
    const participants = useRoomParticipantsStore();
    const [isMeeting, setIsMeeting] = useState(true);
    const { leaveRoom, createRoom, joinRoom, otherGenderParticipants } = useRoom();
    const { open, close, Modal } = useModal();
    const { roomId } = useParams();
    const { member } = useMember();
    const navigate = useNavigate();
    const otherIdx = useOtherIdxStore();
    const setOtherIdx = useSetOtherIdxStore();
    const [isFriend, setIsFriend] = useState(false);
    const other = participants.find((participant) => participant.id !== member?.memberId);
    const [isFriendAccept, setIsFriendAccept] = useState(false);

    const problems = useProblemsStore();
    const results = useResultsStore();

    console.log(participants);
    console.log(participants.length);
    console.log(problems);
    console.log(results);
    //participants가 안담기내
    const client = useRef<StompJs.Client | null>(null);
    const onConnect = () => {
        client.current?.subscribe(`/user/${member?.memberId}/sub/game`, (message) => {
            const response = JSON.parse(message.body);
            console.log(response);

            afterSubscribe(response, '상대방이 친구를 수락했습니다.', () => {
                console.log(response);
                setIsFriendAccept(true);
            });

            afterSubscribe(response, '친구가 추가되었습니디.', () => {
                console.log(response);
            });
        });
    };

    useEffect(() => {
        if (isFriend && isFriendAccept) {
            publishSocket(
                {
                    memberA: member?.memberId,
                    memberB: other?.id,
                },
                client,
                Number(roomId),
            );
        }
    }, [isFriend, isFriendAccept]);

    const wantFriend = () => {
        publishSocket(
            {
                isFriend: true,
                memberId: other?.id,
            },
            client,
            Number(roomId),
        );
        setIsFriend(true);
    };

    useEffect(() => {
        connect(client, onConnect);
        return () => disConnect(client);
    }, []);

    const endTimer = () => {
        leaveRoom(Number(roomId));
        if (member?.gender === 'm') {
            createRoom({
                videoRoomName: '개인방',
                maxParticipants: 2,
                mainTag: '',
                videoRoomHobbies: [],
                videoRoomPersonalities: [],
            });
        }
        setIsMeeting(false);
        open();
    };
    const handleConfirmModal = async () => {
        if (otherIdx === 1) {
            if (member?.gender === 'm') {
                const response = await instance.get(`qufit/video/recent`, {
                    params: { hostId: member.memberId },
                });
                navigate(PATH.PERSONAL_VIDEO(Number(response.data['videoRoomId: '])));
            } else if (member?.gender === 'f') {
                const response = await instance.get(`qufit/video/recent`, {
                    params: { hostId: otherGenderParticipants[1].id },
                });
                joinRoom(response.data['videoRoomId: ']);
                navigate(PATH.PERSONAL_VIDEO(Number(response.data['videoRoomId: '])));
            }
            setIsMeeting(true);
            setOtherIdx(2);
        } else {
            //otherIdx가 0이면 1로 세팅하고 다음 사람과 연결
            //otherIdx가 1이면 모든 미팅이 종료되었어요 페이지 뜨고 이동
            setOtherIdx(0);
            navigate(PATH.CHATTING);
        }
    };
    return (
        <>
            <Modal>
                <MoveRoomModal
                    onClose={close}
                    onClick={handleConfirmModal}
                    message={
                        otherIdx === 1
                            ? isFriendAccept && isFriend
                                ? '상대방과 친구가 되었어요!. 다른 방으로 이동해주세요.'
                                : '상대방과 친구가 되지 못했어요. 다른 방으로 이동해주세요.'
                            : isFriendAccept && isFriend
                            ? '상대방과 친구가 되었어요!. 버튼을 누르면 채팅방으로 이동해요.'
                            : '상대방과 친구가 되지 못했어요. 버튼을 누르면 채팅방으로 이동해요.'
                    }
                />
            </Modal>

            {isMeeting && (
                <div className="flex flex-col h-full gap-8">
                    <div className="flex items-center ">
                        <PersonalVideoTimer endSec={PERSONAL_VIDEO_END_SEC} onEnd={endTimer} />

                        <div onClick={wantFriend} className="mt-3">
                            {isFriend ? (
                                <AddedFriendIcon width={'6rem'} height={'6rem'} />
                            ) : (
                                <AddFriendsIcon width={'6rem'} height={'6rem'} />
                            )}
                        </div>
                    </div>
                    <div className="flex w-full gap-[2.5rem] p-12">
                        <ParticipantVideo roomMax={2} gender="m" participants={participants} status={'meeting'} />
                        <ParticipantVideo roomMax={2} gender="f" participants={participants} status={'meeting'} />
                    </div>
                    <PersonalResult participants={participants} results={results} problems={problems} />
                </div>
            )}
        </>
    );
};

export default PersonalVideoPage;
