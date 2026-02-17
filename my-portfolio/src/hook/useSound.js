import { useRef } from "react";

const useSound = (src) => {
  const audioRef = useRef(new Audio(src));

  //   play sound from start
  const play = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return play;
};

export default useSound;
