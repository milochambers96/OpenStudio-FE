import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "./config";

import Navbar from "./components/Layout/Navbar";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home";
import MemberAccess from "./components/MemberAccess/MemberAccess";
import ArtworkList from "./components/DisplayArtworks/Marketplace/ArtworksList";
import StudioProfile from "./components/StudioDisplay/StudioProfile";
import GalleryProfile from "./components/GalleryDisplay/GalleryProfile";
import About from "./components/About";

import SpecificArtwork from "./components/DisplayArtworks/MarketDisplay/SpecifcArtwork";
import UpdateArtworkDetails from "./components/DisplayArtworks/MarketDisplay/ArtworkMakerActions/UpdateArtworkDetails";

import { IMember } from "./interfaces/member";

function App() {
  const [member, setMember] = useState<IMember | null>(null);
  const [isArtist, setIsArtist] = useState(false);
  const [isCollector, setIsCollector] = useState(false);

  async function fetchMember() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(`${baseUrl}/members/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMember(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching member:",
          error.response?.status,
          error.response?.data
        );
      } else {
        console.error("Error fetching member:", error);
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchMember();
    }
  }, []);

  useEffect(() => {
    if (member?.user_type === "artist") {
      setIsArtist(true);
    } else {
      setIsArtist(false);
    }
  }, [member]);

  useEffect(() => {
    if (member?.user_type === "collector") {
      setIsCollector(true);
    } else {
      setIsCollector(false);
    }
  }, [member]);

  return (
    <Router>
      <Layout>
        <Navbar
          member={member}
          setMember={setMember}
          isArtist={isArtist}
          isCollector={isCollector}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/member-access"
            element={<MemberAccess fetchMember={fetchMember} />}
          />
          <Route path="/marketplace" element={<ArtworkList />} />
          <Route path="/studio" element={<StudioProfile member={member} />} />
          <Route path="/gallery" element={<GalleryProfile member={member} />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/artwork/:id"
            element={<SpecificArtwork member={member} />}
          />
          <Route
            path="/artwork/:artworkId/edit-details"
            element={<UpdateArtworkDetails memberId={member?.id} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
