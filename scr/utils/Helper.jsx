export const formatTime = (sec) => {
    if (!sec) return "0:00";

    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
