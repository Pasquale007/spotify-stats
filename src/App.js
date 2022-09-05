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

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/artists" element={<Artists/>} />
          <Route path="/details/:id" element={<DetailedView />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter >
  );

}