import { useContext, useEffect, useState } from "react";
import { Deviation, Track } from "../types/types";
import { deviation, get_moderated_tracks, get_user_tracks } from "../api/requests";
import ModeratedSong from "../components/ModeratedSong";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Moderator() {
  const {authUser} = useContext(AuthContext);
  const [moderatedTracks, setModeratedTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetchModeratedTracks();
  }, []);

  const fetchModeratedTracks = async () => {
    const res = await get_moderated_tracks();
    setModeratedTracks(res?.data);
    console.log(res?.data);
  };

  const handleAcceptTrack = async (trackId: string) => {
    await axios.put(
      `http://localhost:3666/moderate_track_consideration/${trackId}`
    );
    fetchModeratedTracks();
  };

  const handleDeclineTrack = async (deviationData: Deviation) => {
      await deviation(deviationData);
      fetchModeratedTracks();
  }

  if(authUser === undefined || authUser.roleId != 2)
    {
      return <Navigate to="/auth"/>
    }

  return (
    <div className="m-auto max-w-6xl">
      <p className="text-white text-3xl mt-5 select-none">Панель модератора</p>
      <div className="mt-5">
        {moderatedTracks.length > 0 ? (
              moderatedTracks.map((track) => {
                return <ModeratedSong key={track.ID_Track} track={track} onAcceptTrack={handleAcceptTrack} onDeclineTrack={handleDeclineTrack}/>;
              })
            ) : (
              <p className="text-center text-white font-semibold text-xl my-4">
                Треков пока что нет
              </p>
            )}
      </div>
    </div>
  );
}
