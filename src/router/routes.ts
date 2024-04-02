import Playlist from "../components/Playlist";
import UserCardProfile from "../pages/UserCardProfile";
import Auth from "../pages/Auth";
import Index from "../pages/Index";
import PlaylistInfo from "../pages/PlaylistInfo";
import Reg from "../pages/Reg";
import UserMusic from "../pages/UserMusic";

export const routes = [
  { path: "/auth", component: Auth, exact: true },
  { path: "/reg", component: Reg, exact: true },
  { path: "/", component: Index, exact: true },
  { path: "/profile", component: UserCardProfile, exact: true },
  { path: "/my_music", component: UserMusic, exact: true },
  { path: "/playlist", component: PlaylistInfo, exact: true },
];
