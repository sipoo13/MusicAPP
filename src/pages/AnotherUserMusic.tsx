import { useEffect, useState } from "react";
import { Track, User } from "../types/types";
import { useParams } from "react-router-dom";
import UserPlaylist from "../components/UserPlaylist";
import { get_user, get_user_tracks } from "../api/requests";
import axios from "axios";

export default function AnotherUserMusic() {
    const { id } = useParams();
    const [userSingles, setUserSingles] = useState<Track[]>([]);
    const [user, setUser] = useState<User>();
    const [isMyProfile, setIsMyProfile] = useState(false);

    useEffect(() => {
        fetchUserTracks();

        get_user(id).then((res) => {
          if (res.status === 200) {
            setUser(res.data);
          }
        });
      }, []);

      useEffect(() => {
        if (user?.ID_User == id) {
          setIsMyProfile(true);
        } else {
          setIsMyProfile(false);
        }
      }, [user]);

      const handleDeleteTrack = async (id: number) => {
        await axios
          .delete(`http://localhost:3666/track/${id}`)
          .then((res) => {
            if(res.status == 200)
              {
                fetchUserTracks();
              }
          });
    }
    
      const fetchUserTracks = async () => {
        get_user_tracks(id).then((res) => {
          setUserSingles(res?.data);
          console.log(res?.data);
        });
      }

  return (
    <div className="max-w-6xl m-auto">
      <div className="mt-4">
        <p className="text-white text-3xl font-semibold select-none">
          Музыка {user?.Alias}
        </p>
        <div className="mt-3 grid grid-cols-5">
          {userSingles.length > 0 ? (
            userSingles.map((track, index) => {
              if (index <= 4)
                return <UserPlaylist key={track.ID_Track} track={track} isMyMusic={isMyProfile} onDeleteTrack={handleDeleteTrack}/>;
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
