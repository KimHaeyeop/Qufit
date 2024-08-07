import { FemaleIcon, MaleIcon } from '@assets/svg/video';

const GameResultCard = ({ scenario, isMore }) => {
    return (
        <div>
            <div
                className={`flex items-center justify-center p-8 rounded-3xl h-36 w-80 ${
                    isMore ? 'bg-purple' : 'bg-lightPurple-4'
                }`}
            >
                <p className="text-white">{scenario}</p>
            </div>
            <div className="flex justify-center">
                <div>
                    <MaleIcon width={'2.5rem'} height={'2.5rem'} />
                </div>
                <div>
                    <FemaleIcon width={'2.5rem'} height={'2.5rem'} />
                </div>
            </div>
        </div>
    );
};

export default GameResultCard;
