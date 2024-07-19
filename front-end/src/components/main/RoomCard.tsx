import Tag from './Tag';
import { FemaleIcon, MaleIcon } from '@assets/svg/main';

interface RoomCardProps {
    id: string;
    title: string;
    tags: string[];
}

const RoomCard = ({ id, title, tags }: RoomCardProps) => {
    return (
        <button className="relative flex items-center w-full h-64 rounded-3xl effect-pureWhite hover:effect-pink hover:border-4 hover:border-lightPurple-2">
            <div className="absolute z-10 flex flex-col justify-between w-full h-full px-5 py-6 hover:px-4 hover:py-5">
                <div>
                    <h1 className="h-16 pt-1 text-xl font-medium text-left text-white line-clamp-2 text-ellipsis">
                        {title}
                    </h1>
                    <div className="w-[calc(100%+0.75rem)] flex flex-wrap mt-2 overflow-hidden max-h-16">
                        {tags.map((tag, index) => (
                            <Tag key={index} tag={tag} />
                        ))}
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="flex mr-10">
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            <MaleIcon className="h-5" />
                        </div>
                        <p className="ml-4 text-xl font-medium text-white">3 / 4</p>
                    </div>
                    <div className="flex">
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            <FemaleIcon className="h-5" />
                        </div>
                        <p className="ml-4 text-xl font-medium text-white">1 / 4</p>
                    </div>
                </div>
            </div>
            <div className="z-0 w-full h-64 rounded-3xl bg-whitePink opacity-30 hover:opacity-10" />
        </button>
    );
};

export default RoomCard;
