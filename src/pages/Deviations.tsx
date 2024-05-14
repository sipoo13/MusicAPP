import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { get_deviation_tracks } from "../api/requests";
import { Track } from "../types/types";
import DeviationSong from "../components/DeviationSong";
import { AuthContext } from "../context/AuthContext";

export default function Deviations() {
  const { id } = useParams();
  const { authUser } = useContext(AuthContext);
  const [deviationTracks, setDeviationTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetchDeviationTracks();
  }, []);

  const fetchDeviationTracks = async () => {
    const res = await get_deviation_tracks(id);
    setDeviationTracks(res?.data);
  };

  if(authUser === undefined || authUser.id_user.toString() != id) {
    return <Navigate to="/auth"/>
  }

  return (
    <div className="max-w-6xl m-auto">
      <p className="text-white text-3xl mt-5 select-none">Отказы</p>
      <div className="mt-5">
        {deviationTracks.length > 0 ? (
          deviationTracks.map((track) => {
            return (
              <DeviationSong
                key={track.ID_Track}
                track={track}
              />
            );
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
