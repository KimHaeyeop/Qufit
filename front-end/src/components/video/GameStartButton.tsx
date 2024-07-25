import { useState } from 'react';
import animateData from '@assets/lottie/heart button.json';
import { useRoomManagerName, useRoomMyName } from '@stores/video/roomStore';
import LottieComponent from '@components/common/LottieComponent';

const GameStartButton = () => {
    const [isStart, setIsStart] = useState(false);
    const myName = useRoomMyName();
    const managerName = useRoomManagerName();

    const gameStart = () => {
        if (myName && managerName && managerName === myName) {
            setIsStart(true);
        }
    };
    return (
        <div className="flex gap-8 group" onClick={gameStart}>
            {!isStart ? (
                <LottieComponent
                    animationData={animateData}
                    speed={0.5}
                    isPaused={false}
                    isStopped={false}
                    loop={false}
                    init={0}
                    end={69}
                />
            ) : (
                <LottieComponent
                    animationData={animateData}
                    speed={0.3}
                    isPaused={false}
                    isStopped={false}
                    loop={true}
                    init={70}
                />
            )}
        </div>
    );
};

export default GameStartButton;
