import React, { useEffect, useState } from "react";
import Playlist from "../components/Playlist";
import Song from "../components/Song";
import { useParams } from "react-router-dom";
import { get_favourite_tracks } from "../api/requests";
import { Track } from "../types/types";

export default function UserMusic() {
  const { id } = useParams();
  const [userSingles, setUserSingles] = useState<Track[]>([]);

  useEffect(() => {
    get_favourite_tracks(id).then((res) => {
      setUserSingles(res?.data);
      console.log(res?.data);
    });
  }, []);

  return (
    <div className="h-full">
      <div className="max-w-6xl m-auto">
        <div className="mb-48">
          <h3 className="text-white my-3 text-3xl font-semibold">
            Моя медиатека
          </h3>
          <div>
            {userSingles.length > 0 ? (
              userSingles.map((track) => {
                return <Song key={track.ID_Track} track={track} />;
              })
            ) : (
              <p className="text-center text-white font-semibold text-xl my-4">
                Треков пока что нет
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
