const GameEnd = () => {
    return (
        <div className="relative flex items-center justify-center p-3 bg-black aspect-gameBg">
            <div className="flex justify-center rounded-lg item-center bg-gray">
                <img
                    src="/src/assets/gif/밸런스게임중.gif"
                    alt="밸런스게임중"
                    className="w-full opacity-0 rounded-2xl"
                />

                <p>Please stick around for</p>
            </div>
        </div>
    );
};

export default GameEnd;
