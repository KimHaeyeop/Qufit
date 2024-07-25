import { useRoomManagerNameStore, useRoomMyNameStore } from '@stores/video/roomStore';
import { useEffect, useState } from 'react';

const useRoom = () => {
    const managerName = useRoomManagerNameStore();
    const myName = useRoomMyNameStore();

    const [isManager, setIsManager] = useState(false);
    useEffect(() => {
        setIsManager(!!myName && !!managerName && managerName === myName);
    }, [managerName, myName]);

    return { isManager };
};

export default useRoom;
