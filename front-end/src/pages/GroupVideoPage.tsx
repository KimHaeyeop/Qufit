import { VideoTrack } from 'livekit-client';
import { useState } from 'react';

import VideoComponent from '@components/video/VideoComponent';
import AudioComponent from '@components/video/AudioComponent';
import EmptyVideo from '@components/video/EmptyVideo';
import { useRoomManagerNameStore, useRoomParticipantsStore } from '@stores/video/roomStore';
import GameStartButton from '@components/video/GameStartButton';

import { GROUP_VIDEO_END_SEC } from '@components/video/VideoConstants';
import { PATH } from '@routers/PathConstants';
import VideoTimer from '@components/video/GroupVideoTimer';
import useRoom from '@hooks/useRoom';

function GroupVideoPage() {
    const managerName = useRoomManagerNameStore();
    const participants = useRoomParticipantsStore();
    const { createRoom, joinRoom, leaveRoom } = useRoom();

    return (
        <>
            <div className="flex flex-col items-center justify-between w-full h-screen">
                <div className="flex w-full gap-4">
                    {Array(4)
                        .fill(0)
                        .map((_, idx) =>
                            idx < participants.length ? (
                                <VideoComponent
                                    key={participants[idx].name}
                                    track={
                                        Array.from(participants[idx].videoTrackPublications.values())[0]
                                            .track as VideoTrack
                                    }
                                    isManager={participants[idx].name === managerName}
                                    participateName={participants[idx].name!}
                                />
                            ) : (
                                <EmptyVideo />
                            ),
                        )}
                </div>
                <div>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => {
                                createRoom();
                            }}
                        >
                            생성하기
                        </button>

                        <button
                            onClick={() => {
                                joinRoom(79);
                            }}
                        >
                            입장하기
                        </button>
                        <button onClick={() => leaveRoom(79)}>나가기</button>
                    </div>

                    <VideoTimer
                        endSec={GROUP_VIDEO_END_SEC}
                        afterFunc={() => {
                            location.href = PATH.ROOT;
                        }}
                    />
                    <GameStartButton />
                </div>
                <div className="flex w-full gap-4">
                    {Array(4)
                        .fill(0)
                        .map((_, idx) =>
                            idx + 4 < participants.length ? (
                                <VideoComponent
                                    key={participants[idx + 4].name}
                                    track={
                                        Array.from(participants[idx + 4].videoTrackPublications.values())[0]
                                            .track as VideoTrack
                                    }
                                    isManager={participants[idx + 4].name === managerName}
                                    participateName={participants[idx + 4].name!}
                                />
                            ) : (
                                <EmptyVideo />
                            ),
                        )}
                </div>
                <div className="hidden">
                    {participants.map((participant) => (
                        <AudioComponent
                            key={participant.name}
                            track={participant.audioTrackPublications.values().next().value.track}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default GroupVideoPage;
