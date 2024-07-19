import { useState } from 'react';
import { UserInfoDummy, RoomsInfoDummy } from '@dummy/Dummy';
import { BoxIcon, RecommendRoomIcon, FilterIcon } from '@assets/svg/main';
import RoomCard from '@components/main/RoomCard';

const MainPage = () => {
    const useHover = () => {
        const [isHovered, setIsHovered] = useState(false);
        const handleMouseOver = () => setIsHovered(true);
        const handleMouseOut = () => setIsHovered(false);

        return { isHovered, handleMouseOver, handleMouseOut };
    };

    const boxHover = useHover();
    const recommendHover = useHover();

    return (
        <div className="absolute z-10 flex flex-col w-full h-full px-20 py-12">
            <div className="flex flex-col">
                <h1 className="mb-3 text-6xl font-bold leading-none text-white font-barlow opacity-90">
                    Look who's here !
                </h1>
                <h1 className="text-6xl font-bold leading-none text-white font-barlow opacity-90">
                    Welcome, <span className="text-5xl text-black">{UserInfoDummy.nickname}</span>
                </h1>
            </div>
            <div className="flex items-center justify-between w-full mt-10 mb-7">
                <div className="flex">
                    <button
                        onMouseOver={boxHover.handleMouseOver}
                        onMouseOut={boxHover.handleMouseOut}
                        className="flex items-center w-16 py-3 pl-3 mr-5 duration-100 ease-in-out bg-white transition-width bg-opacity-40 rounded-2xl hover:w-44"
                    >
                        <BoxIcon className="min-w-10 max-w-10" />
                        {boxHover.isHovered ? (
                            <>
                                <p className="pb-0.5 text-2xl font-medium text-white min-w-28">방만들기</p>
                            </>
                        ) : (
                            <></>
                        )}
                    </button>
                    <button
                        onMouseOver={recommendHover.handleMouseOver}
                        onMouseOut={recommendHover.handleMouseOut}
                        className="flex items-center w-16 py-3 pl-3 duration-100 ease-in-out bg-white transition-width bg-opacity-40 rounded-2xl hover:w-52"
                    >
                        <RecommendRoomIcon className="min-w-10 max-w-10 ml-0.5" />
                        {recommendHover.isHovered ? (
                            <>
                                <p className="pb-0.5 text-2xl font-medium text-white min-w-36">방 추천받기</p>
                            </>
                        ) : (
                            <></>
                        )}
                    </button>
                </div>
                <button className="relative flex items-center justify-center w-48 border-4 rounded-full h-14 border-lightPurple-5 effect-indyBlue">
                    <div className="z-10 flex items-center">
                        <FilterIcon className="w-8" />
                        <p className="pb-0.5 ml-2 text-2xl font-medium text-white">태그 필터</p>
                    </div>
                    <div className="absolute z-0 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-48 h-14 rounded-full bg-indyBlue opacity-30" />
                </button>
            </div>
            <div className="grid w-full h-full grid-cols-3 gap-8 overflow-y-auto scrollbar-hide">
                {RoomsInfoDummy.map((data) => (
                    <RoomCard key={data.id} id={data.id} title={data.title} tags={data.tags} />
                ))}
            </div>
        </div>
    );
};

export default MainPage;
