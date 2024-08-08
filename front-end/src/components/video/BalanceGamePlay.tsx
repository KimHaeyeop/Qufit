import TypingText from '@components/video/TypingText';

interface BalanceGamePlayProps {
    onNext: () => void;
}

const BalanceGamePlay = ({ onNext }: BalanceGamePlayProps) => {
    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg item-center">
                <img src="/src/assets/gif/밸런스게임중.gif" alt="밸런스게임중" className="w-full rounded-2xl" />
            </div>

            <div className="absolute bottom-[1.5rem] gap-[1rem] flex flex-col w-[calc(100%-5rem)] p-[2rem] bg-black opacity-50 min-h-[10rem]">
                <TypingText
                    frame={50}
                    text={' '}
                    afterFunc={() => {}}
                    className="w-full text-xl font-bold text-white"
                />
                {true && (
                    <TypingText
                        frame={50}
                        text={
                            '안녕! 난 밸런스의 마법사야. 여기서 너의 선택이 사랑으로 이어질지도 몰라. 각선택이 너의 인연을 가깝게 할 거야. 그럼, 준비됐지? 사랑을 찾아볼까?  '
                        }
                        afterFunc={() => {}}
                        className="w-full text-lg text-white"
                    />
                )}
            </div>
        </div>
    );
};

export default BalanceGamePlay;
