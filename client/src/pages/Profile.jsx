<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
=======
import React, { useContext, useEffect, useState } from "react";
>>>>>>> 414a2c56b023d9112bd73108d2b1ef2a4ffa8678
import "../styles/Profile.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ProfileCard from "../components/ProfileCard";
import MeetData from "../components/MeetData";
import { SocketContext } from "../context/SocketContext";
<<<<<<< HEAD
=======
 
>>>>>>> 414a2c56b023d9112bd73108d2b1ef2a4ffa8678

const Profile = () => {
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const { socket, myMeets, setMyMeets } = useContext(SocketContext);

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("fetch-my-meets", { userId });

    socket.on("meets-fetched", async ({ myMeets }) => {
      console.log("myMeetsss", myMeets);
      setMyMeets(myMeets);
<<<<<<< HEAD
      console.log(myMeets);
=======
>>>>>>> 414a2c56b023d9112bd73108d2b1ef2a4ffa8678
    });
  }, [socket]);

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="profilePage">
      <div className="profile-header">
        <div className="profile-logo">
          <h2
            onClick={() => {
              navigate("/");
            }}
          >
            Flux Meet
          </h2>
        </div>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">{userName}</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link className="dropdown-options" to="/">
                Join meet
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-options" onClick={handleLogOut}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="profile-body">
        <div className="profile-card-container">
          <ProfileCard />
        </div>
        <div className="meet-data-container">
          <MeetData />
        </div>
      </div>
    </div>
  );
};

export default Profile;
