import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Access/Register";
import Login from "./components/Access/Login";
import ArtworkList from "./components/DisplayArtworks/ArtworksList";

import { IMember } from "./interfaces/member";

function App() {
  const [member, setMember] = useState<IMember | null>(null);
  const [isArtist, setIsArtist] = useState(false);
  const [isCollector, setIsCollector] = useState(false);

  async function fetchMember() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/members/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMember(response.data);
    } catch (error) {
      console.error(error);
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
      <Navbar
        member={member}
        setMember={setMember}
        isArtist={isArtist}
        isCollector={isCollector}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login fetchMember={fetchMember} />} />
        <Route path="marketplace" element={<ArtworkList />} />
      </Routes>
    </Router>
  );
}

export default App;
