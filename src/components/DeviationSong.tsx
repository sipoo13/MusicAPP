import { FC, useState } from "react";
import { Track } from "../types/types";
import Modal from "./Modal";

interface TrackProps {
  track: Track;
}

const DeviationSong: FC<TrackProps> = ({ track: track }) => {

  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 h-[158px] flex justify-between">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-white select-none mr-12">Причина отказа</h1>
          <p className="text-white">{track.Deviation_Reason}</p>
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
        <button 
        className="text-black hover:bg-[#e2e2e2] font-sans font-semibold text-sm w-[200px] bg-white py-2 px-2 rounded-sm"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}>
          Посмотреть причину
        </button>
      </div>
    </div>
  );
};

export default DeviationSong;
