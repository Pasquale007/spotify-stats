import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Layout";

//import pages
import Login from "./pages/SpotifyLogin/Login";
import Logout from "./pages/SpotifyLogout/Logout";
import HomePage from "./pages/Home/HomePage";
import Callback from "./Callback";
import Tracks from "./pages/Tracks/Tracks";
import DetailedView from "./pages/DetailedView/DetailedView";
import Artists from "./pages/Artists/Artists";
import FollowedArtists from "./pages/FollowedArtists/FollowedArtists";
import Playlists from "./pages/Playlists/Playlists";
import Contact from "./pages/Contact/Contact";
import RequireAuth from "./RequireAuth";
import Mix from "./pages/mix/Mix";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<RequireAuth />}>
          <Route path="/mix" element={<Mix />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/follower" element={<FollowedArtists />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/details/:id" element={<DetailedView />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter >
  );

}