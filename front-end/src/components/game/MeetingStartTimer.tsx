import useTimer, { TimerProps } from '@hooks/useTimer';

const MeetingStartTimer = ({ endSec, afterFunc }: TimerProps) => {
    const restSec = useTimer(endSec, afterFunc);
    console.log('타이머 시작');
    return <section className="flex items-center gap-4 py-4"></section>;
};

export default MeetingStartTimer;
