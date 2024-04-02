import { Pause, PauseCircle, Play, PlayCircle, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/FooterPlayStyle.css';
import ProgressBar from "./ProgressBar";
import { Slider } from "@mui/material";
import { Favorite } from "@mui/icons-material";

const FooterPlay = () => {
    const [isPause, setisPause] = useState(false);
    const [isShuffle, setisShuffle] = useState(false);
    const [isRepeat, setisRepeat] = useState(0);
    const [isLike, setisLike] = useState(false);

    const handlePlayClick = () => {
        setisPause(true);
    }

    const handleLikeClick = () => {
        if (isLike) setisLike(false);
        if (!isLike) setisLike(true);
    }

    const handlePauseClick = () => {
        setisPause(false);
    }

    const handleShuffleClick = () => {
        if (isShuffle) setisShuffle(false);
        else setisShuffle(true);
    }

    const handleRepeatClick = () => {
        if (isRepeat === 0) setisRepeat(1);
        else if (isRepeat === 1) setisRepeat(2);
        else if (isRepeat === 2) setisRepeat(0);
    }

    return (
        <footer className="bg-black py-3 fixed bottom-0 w-full">
            {/* <div className="max-w-[1680px] m-auto flex justify-between items-center">
                <div className="flex justify-between">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/ru/b/bd/Playboi_Carti_Mixtape.jpg"
                        className="w-[52px] h-[52px] rounded" />
                    <div className="ml-4 my-auto">
                        <p className="text-white font-semibold text-sm">Location</p>
                        <Link to='/' className="text-gray-400 font-semibold text-[12px] hover:underline">Playboi Carti</Link>
                    </div>
                    <div className="ml-4 space-x-2 flex justify-between items-center">
                        <Volume1 color="#ffff"/>
                        <Slider defaultValue={60} aria-label="Disabled slider" sx={{width:100}}/>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gray-400 font-semibold text-[12px] mr-2">2:34</p>
                    <Slider defaultValue={60} aria-label="Disabled slider" sx={{width:750}}/>
                    <p className="text-gray-400 font-semibold text-[12px] ml-2">3:32</p>
                </div>
                <div className="flex justify-between space-x-4 items-center">
                    {isShuffle
                        ?
                        <button><Shuffle className="icon" size='18' onClick={handleShuffleClick} /></button>
                        :
                        <button><Shuffle className="clickedIcon" size='18' onClick={handleShuffleClick} /></button>}
                    <button><SkipBack className="icon" size='18' /></button>
                    {isPause
                        ?
                        <button onClick={handlePauseClick}><PauseCircle size='32' color="#ffff" /></button>
                        :
                        <button onClick={handlePlayClick}><PlayCircle size='32' color="#ffff" /></button>}
                    <button><SkipForward className="icon" size='18' /></button>
                    {isRepeat === 0 && <button onClick={handleRepeatClick}><Repeat className="icon" size='18' /></button>}
                    {isRepeat === 1 && <button onClick={handleRepeatClick}><Repeat className="clickedIcon" size='18' /></button>}
                    {isRepeat === 2 && <button onClick={handleRepeatClick}><Repeat1 className="clickedIcon" size='18' /></button>}
                </div>
            </div> */}
            <div className="max-w-[1800px] m-auto grid grid-cols-4">
                <div className="flex">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg"
                        className="w-[52px] h-[52px] rounded" />
                    <div className="ml-4 my-auto">
                        <p className="text-white font-semibold text-sm cursor-pointer hover:underline">Good Morning</p>
                        <Link to='/' className="text-gray-400 font-semibold text-[12px] hover:underline">Kanye West</Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 24 }}>
                        {isLike
                            ?
                            <button onClick={handleLikeClick}><Favorite className="icon" sx={{ color: "#e11d48" }}></Favorite></button>
                            :
                            <button onClick={handleLikeClick}><Favorite className="icon" sx={{ color: "#b2b2b2" }}></Favorite></button>
                        }
                    </div>
                    <div className="ml-18 space-x-2 flex justify-between items-center">
                        <Volume1 color="#ffff" />
                        <Slider defaultValue={60} aria-label="Disabled slider" sx={{ width: 100 }} />
                    </div>
                </div>
                <div className="flex justify-between items-center col-span-2">
                    <p className="text-gray-400 font-semibold text-[12px]">2:34</p>
                    <Slider defaultValue={60} aria-label="Disabled slider" sx={{ width: 825 }} />
                    <p className="text-gray-400 font-semibold text-[12px] ml-2">3:32</p>
                </div>
                <div className="flex space-x-4 items-center justify-end">
                    {isShuffle
                        ?
                        <button><Shuffle className="icon" size='18' onClick={handleShuffleClick} /></button>
                        :
                        <button><Shuffle className="clickedIcon" size='18' onClick={handleShuffleClick} /></button>}
                    <button><SkipBack className="icon" size='18' /></button>
                    {isPause
                        ?
                        <button onClick={handlePauseClick}><PauseCircle size='32' color="#ffff" /></button>
                        :
                        <button onClick={handlePlayClick}><PlayCircle size='32' color="#ffff" /></button>}
                    <button><SkipForward className="icon" size='18' /></button>
                    {isRepeat === 0 && <button onClick={handleRepeatClick}><Repeat className="icon" size='18' /></button>}
                    {isRepeat === 1 && <button onClick={handleRepeatClick}><Repeat className="clickedIcon" size='18' /></button>}
                    {isRepeat === 2 && <button onClick={handleRepeatClick}><Repeat1 className="clickedIcon" size='18' /></button>}
                </div>
            </div>
        </footer>
    );
}

export default FooterPlay;