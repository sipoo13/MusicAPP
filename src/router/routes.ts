import UserCardProfile from "../pages/UserCardProfile";
import Auth from "../pages/Auth";
import Index from "../pages/Index";
import Reg from "../pages/Reg";
import UserMusic from "../pages/UserMusic";
import AddMusic from "../pages/AddMusic";
import AnotherUserMusic from "../pages/AnotherUserMusic";
import Moderator from "../pages/Moderator";
import ProfileEdit from "../pages/ProfileEdit";
import Deviations from "../pages/Deviations";

export const routes = [
  { path: "/auth", component: Auth, exact: true },
  { path: "/add_music", component: AddMusic, exact: true},
  { path: "/user_music/:id", component: AnotherUserMusic, exact: true},
  { path: "/reg", component: Reg, exact: true },
  { path: "/", component: Index, exact: true },
  { path: "/profile/:id", component: UserCardProfile, exact: true },
  { path: "/my_music/:id", component: UserMusic, exact: true },
  { path: "/moderator", component: Moderator, exact: true },
  { path: "/deviations/:id", component: Deviations, exact: true },
  { path: "/profile_edit/:id", component: ProfileEdit, exact: true },
];
