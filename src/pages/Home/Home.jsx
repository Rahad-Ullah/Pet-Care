
import Slider from "./Slider/Slider";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <div className='absolute bottom-[68px] md:-bottom-20 lg:-bottom-20 z-10 h-72 md:h-screen w-full bg-zinc-800 bg-opacity-70 flex flex-col justify-center items-center'>
                <div className="text-center text-white max-w-xs md:max-w-3xl">
                    <h1 className='text-2xl lg:text-5xl font-semibold font-poppins text-center leading-tight'>Transform a Life: Adopt a Pet Today!</h1>
                    <p className="text-sm lg:text-xl mt-2">Discover lifelong joy through pet adoption. Browse our furry companions, create lasting memories, and make a difference—one pawprint at a time.</p>
                </div>
            </div>
            {/* <Category></Category> */}
        </div>
    );
};

export default Home;