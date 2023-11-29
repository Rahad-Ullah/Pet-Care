
const useCurrentTime = () => {
    const date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let currentTime = `${hours}:${minutes}:${seconds}`;
    
    return currentTime;
};

export default useCurrentTime;