import { FC, useContext, useState } from "react";
import { Deviation, Track } from "../types/types";
import { TrackContext } from "../context/AudioContext";
import Modal from "./Modal";

interface TrackProps {
  track: Track;
  onAcceptTrack: (trackId: string) => void;
  onDeclineTrack: (deviationData: Deviation) => void;
}

const ModeratedSong: FC<TrackProps> = ({ track: track, onAcceptTrack, onDeclineTrack }) => {
  const {
    setIsPlaying,
    setCurrentSong,
  } = useContext(TrackContext);

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');

  const playNewTrack = () => {
    setCurrentSong(track);
    setIsPlaying(true);
  };

  const handleAcceptTrack = () => {
    onAcceptTrack(track.ID_Track.toString());
  };

  const handleDeclineTrack = async () => {
    const deviationData: Deviation = {
      reason: reason,
      track_id: track.ID_Track
    };
    onDeclineTrack(deviationData);
    setOpen(false);
  };

  return (
    <div
      className="mt-5 h-[158px] flex justify-between hover:bg-[#1a1a1a]"
      onClick={playNewTrack}
    >
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-white select-none">Причина отказа</h1>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="w-[400px] h-[300px] bg-[#242424] text-white rounded-md px-2 resize-none"></textarea>
          <button className="bg-white hover:bg-[#e2e2e2] py-1 rounded-sm text-black font-semibold" onClick={handleDeclineTrack}>Отклонить</button>
        </div>
      </Modal>
      <div className="flex">
        <img
          src={track.Track_Cover}
          className="h-[128px] w-[128px] rounded-md ml-4 my-auto"
        ></img>
        <div className="ml-4 my-auto">
          <p className="text-white select-none text-3xl">{track.Track_Name}</p>
          <p className="text-[#8d8d8d] select-none text-sm mt-2">
            {track.Alias}
          </p>
        </div>
      </div>
      <div className="my-auto mr-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleAcceptTrack();
          }}
        >
          <button className="bg-white hover:bg-[#e2e2e2] text-black font-sans font-semibold text-sm py-1 px-4 rounded-sm select-none w-[100px]">Принять</button>
        </div>
        <div
          className="mt-2"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <button className="bg-[#e11d48] hover:bg-[#ec6a86] text-white font-sans font-semibold text-sm py-1 px-4 rounded-sm select-none w-[100px]">Отклонить</button>
        </div>
      </div>
    </div>
  );
};

export default ModeratedSong;
