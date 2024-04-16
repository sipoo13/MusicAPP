import React, { useEffect, useState } from "react";
import { Track } from "../types/types";
import { useParams } from "react-router-dom";
import UserPlaylist from "../components/UserPlaylist";
import { get_user_tracks } from "../api/requests";

export default function AnotherUserMusic() {
    const { id } = useParams();
    const [userSingles, setUserSingles] = useState<Track[]>([]);

    useEffect(() => {
        get_user_tracks(id).then((res) => {
          setUserSingles(res?.data);
        });
      }, []);

  return (
    <div className="max-w-6xl m-auto">
      <div className="mt-4">
        <p className="text-white text-3xl font-semibold select-none">
          Музыка sipoo
        </p>
        <div className="mt-3 grid grid-cols-5">
          {userSingles.length > 0 ? (
            userSingles.map((track, index) => {
              if (index <= 4)
                return <UserPlaylist key={track.ID_Track} track={track} />;
            })
          ) : (
            <p className="text-center text-white font-semibold text-xl my-4">
              Треков пока что нет
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
