import React, { useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Nav from "./components/Nav";
import FooterPlay from "./components/FooterPlay";
import { AudioContextik } from "./context/AudioContext";

function App() {
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } =
    useContext(AudioContextik);
    const audioElem = useRef<HTMLAudioElement | null>(null);


  const toggleAudio = () => {
    setIsPlaying((prevState) => !prevState);
  };

  useEffect(() => {
    if (isPlaying) {
      audioElem.current?.play();
    } else {
      audioElem.current?.pause();
    }
  }, [isPlaying]);

  return (
    <BrowserRouter>
      <Nav />
      <AppRouter />
      <audio
        src={currentSong?.Track_Audio}
        ref={audioElem}
      />
      <FooterPlay audioElemRef={audioElem} />
    </BrowserRouter>
  );
}

export default App;
