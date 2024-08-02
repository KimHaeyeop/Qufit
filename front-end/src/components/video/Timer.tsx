import SvgTimerIcon from '@assets/svg/video/TimerIcon';

import { useEffect, useState } from 'react';

interface TimerProps {
    endSec: number;
}

const Timer = ({ endSec }: TimerProps) => {
    const [restSec, setRestSec] = useState(endSec);
    const minutes = String(Math.floor(restSec / 60)).padStart(2, '0');
    const second = String(Math.floor(restSec % 60)).padStart(2, '0');
    useEffect(() => {
        const timer = setInterval(() => {
            setRestSec((prev: number) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <section className="flex items-center gap-4 py-4">
            <SvgTimerIcon width={17} height={20} />
            <div className="flex gap-2">
                <p>{minutes}분</p>
                <p>{second}초</p>
            </div>
        </section>
    );
};

export default Timer;
