// import { CameraOffIcon, CrownIcon, MicOffIcon, MicOnIcon } from '@assets/svg/video';
// import { useRoomParticipantsStore, useRoomStateStore } from '@stores/video/roomStore';
// import { LocalVideoTrack, Participant, RemoteVideoTrack } from 'livekit-client';
// import { useEffect, useRef, useState } from 'react';
// import { MouseEvent } from 'react';
// import { FaceLandmarker, FaceLandmarkerOptions, FilesetResolver } from "@mediapipe/tasks-vision";
// import { Color, Euler, Mesh, Matrix4, Vector3 } from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei';

// interface VideoComponentProps {
//     track?: LocalVideoTrack | RemoteVideoTrack;
//     participateName: string;
//     participants?: Participant[];
//     local?: boolean;
//     value?: Participant;
//     isManager: boolean;
// }

// function VideoComponent({ track, isManager, participateName, local = false }: VideoComponentProps) {
//     const videoElement = useRef<HTMLVideoElement | null>(null);
//     const [isMicEnable, setIsMicEnable] = useState(true);
//     const [isCameraEnable, setIsCameraEnable] = useState(true);
//     const room = useRoomStateStore();
//     const participants = useRoomParticipantsStore();
//     // console.log(value?.videoTrackPublications.values());
//     // console.log(value?.videoTrackPublications.values().next());
//     // console.log(value?.videoTrackPublications.values().next().value);
//     // console.log(value?.videoTrackPublications.values().next().value.videoTrack);

//     // console.log(value);
//     // console.log(track);
//     const [position, setPosition] = useState(new Vector3(0, 0, 0));

//     useEffect(() => {
//         if (videoElement.current) {
//             track?.attach(videoElement.current);
//         }
//         return () => {
//             track?.detach();
//         };
//     }, [track, participants]);

//     const changeCameraEnabled = () => {
//         room?.localParticipant.setCameraEnabled(!room?.localParticipant.isCameraEnabled);
//         setIsCameraEnable(!room?.localParticipant.isCameraEnabled);
//     };

//     const changeMicrophoneEnabled = (event: MouseEvent) => {
//         event.stopPropagation();
//         setIsMicEnable(!room?.localParticipant.isMicrophoneEnabled);
//         room?.localParticipant.setMicrophoneEnabled(!room?.localParticipant.isMicrophoneEnabled);
//     };

//     return (
//         <div
//             className="relative z-50 flex flex-col justify-between w-1/4 p-4 rounded-xl aspect-video max-[]"
//             // style={{ width, height }}
//             onClick={changeCameraEnabled}
//         >
//             <div>{isManager && <CrownIcon width={'2.5rem'} />}</div>
//             <div className="flex items-center justify-between w-full">
//                 <p className="font-medium text-white text-md xs:text-xs sm:text-sm">{participateName + (local ? ' (You)' : '')}</p>

//                 <div>{isMicEnable ? <MicOnIcon width={'1.7rem'} /> : <MicOffIcon width={'1.7rem'} />}</div>

//                 <div className="absolute left-0 w-full px-4 pb-3 transition-all duration-1000 group">
//                     <button
//                         className="invisible w-full h-8 bg-darkPurple rounded-xl group-hover:visible"
//                         onClick={(event) => changeMicrophoneEnabled(event)}
//                     >
//                         <div className="flex items-center justify-center gap-1">
//                             {isMicEnable ? <MicOffIcon width={'1.25rem'} /> : <MicOnIcon width={'1.25rem'} />}
//                             <p className={`text-sm xs:text-xs  ${isMicEnable && ' text-smokeWhite'}`}>
//                                 {isMicEnable ? '마이크 끄기' : '마이크 켜기'}
//                             </p>
//                         </div>
//                     </button>
//                 </div>
//             </div>
//             <div className="absolute top-0 left-0 w-full -z-10">
//                 {isCameraEnable ? (
//                     <video
//                         ref={videoElement}
//                         className="w-full rounded-xl "
//                         // style={{ width, height }}
//                     />
//                 ) : (
//                     <>
//                         <div
//                             className="relative flex items-center justify-center w-full bg-white aspect-video opacity-40 rounded-xl"
//                             // style={{ width, height }}
//                         >
//                             <CameraOffIcon
//                                 width={'10rem'}
//                                 className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//                             />
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default VideoComponent;
