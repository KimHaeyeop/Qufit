import './index.css';

function App() {
    return (
        <div className="w-screen h-full bg-[#C58BE5] p-11">
            <div className="flex ">
                {/* card */}
                <div className="effect-pureWhite relative w-[22.5rem] h-[15.625rem] rounded-[1.25rem] mb-10 mr-10 border-4 border-[#DBBEEA]">
                    <p className="absolute">와와오아ㅘㅇABC</p>
                    <div className="w-full h-full bg-whitePink rounded-[1rem] opacity-30"></div>
                </div>
                {/* hover:card */}
                <div className="effect-pink w-[22.5rem] h-[15.625rem] rounded-[1.25rem] mb-10 border-4 border-[#EDB6F4]">
                    <div className="w-full h-full bg-whitePink rounded-[1rem] opacity-20"></div>
                </div>
            </div>
            {/* chatHeaderWrapper */}
            <div className="w-[37.125rem] h-[5.1875rem] rounded-t-[1.875rem] effect-whitePink border-x-4 border-b-2 border-t-4 border-[#DBBEEA]">
                <div className="w-full h-full bg-whitePink rounded-t-[1.875rem] opacity-30"></div>
            </div>
            <div className="flex">
                {/* chatContentsWrapper */}
                <div className="effect-pureWhite w-[37.125rem] h-[34.5625rem] rounded-b-[30px] mb-10 border-x-4 border-t-2 border-b-4 border-[#DBBEEA] mr-10">
                    <div className="w-full h-full bg-whitePink rounded-b-[30px] opacity-30"></div>
                </div>
                {/* chatInput */}
                <div className="effect-purePink w-[526px] h-[65px] rounded-full mb-10 mr-10 border-4 border-[#E7BEF1]">
                    <div className="w-full h-full rounded-full bg-whitePink opacity-20"></div>
                </div>
            </div>
            {/* ContentsLayoutHeader */}
            <div className="effect-layout-2 w-[1317px] h-[140px] rounded-t-[60px] mb-10 border-x-4 border-y-2 border-[#E7BEF1] mr-10">
                <div className="w-full h-full bg-whitePink rounded-t-[60px] opacity-20"></div>
            </div>
            {/* ContentsLayout */}
            <div className="effect-layout w-[1317px] h-[744px] rounded-b-[60px] mb-10 border-b-4 border-[#F7D6FB] mr-10">
                <div className="w-full h-full bg-whitePink rounded-b-[30px] opacity-20"></div>
            </div>
        </div>
    );
}

export default App;
