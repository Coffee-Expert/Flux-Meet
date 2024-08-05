import React, { useContext, useEffect, useState } from "react";
import "../styles/Home.css";
import { AuthContext } from "../context/authContext";
import { SocketContext } from "../context/SocketContext";
import { CgEnter } from "react-icons/cg";
import { RiVideoAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Groups2Icon from "@mui/icons-material/Groups2";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import CloudIcon from "@mui/icons-material/Cloud";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import BoltIcon from "@mui/icons-material/Bolt";
import GoogleIcon from "@mui/icons-material/Google";

import GitHubIcon from "@mui/icons-material/GitHub";

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [newMeetDate, setNewMeetDate] = useState("none");
  const [newMeetTime, setNewMeetTime] = useState("none");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [joinRoomError, setJoinRoomError] = useState("");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
  };

  const { socket, setMyMeets, newMeetType, setNewMeetType } =
    useContext(SocketContext);
  const userId = localStorage.getItem("userId");

  const handleCreateRoom = () => {
    socket.emit("create-room", {
      userId,
      roomName,
      newMeetType,
      newMeetDate,
      newMeetTime,
    });
  };

  const handleJoinRoom = async () => {
    await socket.emit("user-code-join", { roomId: joinRoomId });
    setRoomName("");
  };

  useEffect(() => {
    socket.on("room-exists", ({ roomId }) => {
      navigate(`/meet/${roomId}`);
    });
    socket.on("room-not-exist", () => {
      setJoinRoomId("");
      setJoinRoomError("Room doesn't exist! please try again..");
    });

    socket.emit("fetch-my-meets", { userId });
    socket.on("meets-fetched", async ({ myMeets }) => {
      setMyMeets(myMeets);
    });
  }, [socket]);

  const userName = localStorage.getItem("userName");

  return (
    <div className="homePage">
      <header className="home-header">
        <div className="home-logo">
          <h2>Flux Meet</h2>
        </div>
        {!userName || userName === "null" ? (
          <div className="auth-buttons">
            <button className="login-button" onClick={handleLogIn}>
              Login
            </button>
            <button className="register-button" onClick={handleRegister}>
              Register
            </button>
          </div>
        ) : (
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">{userName}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </header>
      <main className="home-container">
        {!userName || userName === "null" ? (
          <section className="home-intro">
            <div className="intro-text">
              <h2>Seamless Video Conferencing for Your Team</h2>
              <p>
                Flux Meet is a powerful <strong>MERN stack-based</strong> video
                conferencing app that brings your team together, no matter where
                they are. Elevate your virtual communication and connect without
                boundaries today!
              </p>
            </div>
            <div className="btn-cnt">
              <div className="intro-buttons">
                <button className="register-button" onClick={handleRegister}>
                  Get Started
                </button>
                <button className="login-button" onClick={handleLogIn}>
                  Login
                </button>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="home-intro">
              <div className="intro-text">
                <h2>Welcome!! {userName}.</h2>
                <p>
                  Your Lightning Connections Await!! Click on{" "}
                  <strong>Start a meet</strong> if you want to host a meeting,
                  or <strong>Join Meet</strong> with a meeting code to join one.
                </p>
              </div>
            </section>

            <div
              className="modal fade"
              id="createMeetModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="createMeetModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="createMeetModalLabel">
                      Create New Meet
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Name your meet"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Meet name</label>
                    </div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setNewMeetType(e.target.value)}
                    >
                      <option selected>Choose meet type</option>
                      <option value="instant">Instant meet</option>
                      <option value="scheduled">Schedule for later</option>
                    </select>
                    {newMeetType === "scheduled" && (
                      <>
                        <label htmlFor="meetDate" className="form-label">
                          Meet Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="meetDate"
                          onChange={(e) => setNewMeetDate(e.target.value)}
                        />
                        <label htmlFor="meetTime" className="form-label">
                          Meet Time
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          id="meetTime"
                          onChange={(e) => setNewMeetTime(e.target.value)}
                        />
                      </>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCreateRoom}
                      data-bs-dismiss="modal"
                    >
                      Create meet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <section className="meet-btn-cnt">
        <div className="create-meet">
          <input
            type="text"
            placeholder="Name your meet..."
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            data-bs-toggle="modal"
            data-bs-target="#createMeetModal"
            className="register-button"
          >
            <RiVideoAddFill /> New meet
          </button>
        </div>
        <p className="or">or</p>
        <div className="join-meet">
          <input
            type="text"
            placeholder="Enter code..."
            onChange={(e) => setJoinRoomId(e.target.value)}
          />
          <button className="login-button" onClick={handleJoinRoom}>
            <CgEnter /> Join Meet
          </button>
        </div>
        <span className="error-message">{joinRoomError}</span>
      </section>
      <section className="about-app">
        <div className="box">
          <div className="box-inner">
            <div className="box-front">
              <h2 className="title">Features that make a Difference</h2>
              <p>
                Flux Meet offers a suite of powerful features to enhance your
                video conferencing experience.
              </p>
            </div>

            <div className="newcard">
              <div class="flip-card-container">
                <div class="flip-card">
                  <div class="card-front">
                    <figure>
                      <div class="img-bg"></div>
                      <figcaption>
                        <Card.Title>
                          <Groups2Icon />
                        </Card.Title>
                        Easy Group Conference!! Bringing chaos to order, one
                        virtual group hug at a time!
                      </figcaption>
                    </figure>
                  </div>

                  <div class="card-back">
                    <figure>
                      <div class="img-bg"></div>
                    </figure>

                    <button>
                      Enjoy crystal-clear video and audio quality for your team
                      meetings, interviews, and presentations.
                    </button>

                    <div class="design-container">
                      <span class="design design--1"></span>
                      <span class="design design--2"></span>
                      <span class="design design--3"></span>
                      <span class="design design--4"></span>
                      <span class="design design--5"></span>
                      <span class="design design--6"></span>
                      <span class="design design--7"></span>
                      <span class="design design--8"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flip-card-container">
                <div class="flip-card">
                  <div class="card-front">
                    <figure>
                      <div class="img-bg"></div>
                      <figcaption>
                        {" "}
                        <Card.Title>
                          <AddCircleOutlineIcon />
                        </Card.Title>{" "}
                        Unlimited Participants! Bring as big an audience as you
                        like!
                      </figcaption>
                    </figure>
                  </div>

                  <div class="card-back">
                    <figure>
                      <div class="img-bg"></div>
                    </figure>

                    <button>
                      Enjoy crystal-clear video and audio quality for your team
                      meetings, interviews, and presentations, for everyone.
                    </button>

                    <div class="design-container">
                      <span class="design design--1"></span>
                      <span class="design design--2"></span>
                      <span class="design design--3"></span>
                      <span class="design design--4"></span>
                      <span class="design design--5"></span>
                      <span class="design design--6"></span>
                      <span class="design design--7"></span>
                      <span class="design design--8"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flip-card-container">
                <div class="flip-card">
                  <div class="card-front">
                    <figure>
                      <div class="img-bg"></div>
                      <figcaption>
                        {" "}
                        <Card.Title>
                          <ScreenshotMonitorIcon />
                        </Card.Title>{" "}
                        Screen Sharing!! Ensure eveyone can see your steps
                        clearly
                      </figcaption>
                    </figure>
                  </div>

                  <div class="card-back">
                    <figure>
                      <div class="img-bg"></div>
                    </figure>

                    <button>
                      Collaborate effectively by sharing your screen, documents,
                      or presentations with your team.
                    </button>

                    <div class="design-container">
                      <span class="design design--1"></span>
                      <span class="design design--2"></span>
                      <span class="design design--3"></span>
                      <span class="design design--4"></span>
                      <span class="design design--5"></span>
                      <span class="design design--6"></span>
                      <span class="design design--7"></span>
                      <span class="design design--8"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flip-card-container">
                <div class="flip-card">
                  <div class="card-front">
                    <figure>
                      <div class="img-bg"></div>
                      <figcaption>
                        <Card.Title>
                          <HistoryToggleOffIcon />
                        </Card.Title>
                        Schedule meetings!! Want to hold a meeting later?
                        Schedule it!
                      </figcaption>
                    </figure>
                  </div>

                  <div class="card-back">
                    <figure>
                      <div class="img-bg"></div>
                    </figure>

                    <button>
                      Schedule meetings with ease and receive timely reminders
                      to ensure your team is always prepared.
                    </button>

                    <div class="design-container">
                      <span class="design design--1"></span>
                      <span class="design design--2"></span>
                      <span class="design design--3"></span>
                      <span class="design design--4"></span>
                      <span class="design design--5"></span>
                      <span class="design design--6"></span>
                      <span class="design design--7"></span>
                      <span class="design design--8"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flip-card-container">
                <div class="flip-card">
                  <div class="card-front">
                    <figure>
                      <div class="img-bg"></div>
                      <figcaption>
                        <Card.Title>
                          <CloudIcon />
                        </Card.Title>
                        Cloud Recording!! Record your meetings in cloud so that
                        everyone can watch it later.
                      </figcaption>
                    </figure>
                  </div>

                  <div class="card-back">
                    <figure>
                      <div class="img-bg"></div>
                    </figure>

                    <button>
                      Record your meetings and presentations for later review or
                      to share with team members who couldn't attend.
                    </button>

                    <div class="design-container">
                      <span class="design design--1"></span>
                      <span class="design design--2"></span>
                      <span class="design design--3"></span>
                      <span class="design design--4"></span>
                      <span class="design design--5"></span>
                      <span class="design design--6"></span>
                      <span class="design design--7"></span>
                      <span class="design design--8"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flip-card-container">
                <div class="flip-card">
                  <div class="card-front">
                    <figure>
                      <div class="img-bg"></div>
                      <figcaption>
                        <Card.Title>
                          <BoltIcon />
                        </Card.Title>
                        Secure Encryption!! Rest assured that your meeting is
                        hosted safely and securely.
                      </figcaption>
                    </figure>
                  </div>

                  <div class="card-back">
                    <figure>
                      <div class="img-bg"></div>
                    </figure>

                    <button>
                      Protect your team's sensitive information with our
                      end-to-end encrypted video conferencing solution.
                    </button>

                    <div class="design-container">
                      <span class="design design--1"></span>
                      <span class="design design--2"></span>
                      <span class="design design--3"></span>
                      <span class="design design--4"></span>
                      <span class="design design--5"></span>
                      <span class="design design--6"></span>
                      <span class="design design--7"></span>
                      <span class="design design--8"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-cards"></div>
          </div>
        </div>

        <div className="box-inner">
          <div className="box-front">
            <h2 className="title">Use Cases</h2>
            <p>
              Flux Meet is the perfect solution for a variety of use cases, from
              team meetings to online events.
            </p>

            <div className="card-holder">
              <div className="ccard">
                <div className="image">
                  <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                </div>
                <div className="card-title">Team Meetings</div>
                <div className="card-text">
                  Bring your entire team together for effective collaboration
                  and decision-making.
                </div>
              </div>

              <div className="ccard">
                <div className="img">
                  <img src="https://images.pexels.com/photos/4049870/pexels-photo-4049870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                </div>
                <div className="card-title">Online Events</div>
                <div className="card-text">
                  Host webinars, conferences, and other virtual events with
                  ease.
                </div>
              </div>

              <div className="ccard">
                <div className="img">
                  <img src="https://images.pexels.com/photos/4559600/pexels-photo-4559600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                </div>
                <div className="card-title">Remote Interviews</div>
                <div className="card-text">
                  Conduct seamless interviews with candidates from anywhere in
                  the world.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="box-front">
          <h2 className="title">Contact us</h2>
          <p>
            Have a question or need help with Flux Meet? We are here to assist
            you..
          </p>
          <div className="form-cnt">
            <form>
              <div class="row mb-4">
                <div class="col mb-8">
                  <div data-mdb-input-init class="form-outline">
                    <input
                      type="text"
                      id="form3Example1"
                      class="form-control"
                    />
                    <label class="form-label" for="form3Example1">
                      First name
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div data-mdb-input-init class="form-outline">
                    <input
                      type="text"
                      id="form3Example2"
                      class="form-control"
                    />
                    <label class="form-label" for="form3Example2">
                      Last name
                    </label>
                  </div>
                </div>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <input type="email" id="form3Example3" class="form-control" />
                <label class="form-label" for="form3Example3">
                  Email address
                </label>
              </div>

              <div data-mdb-input-init class="form-outline mb-4 ">
                <input
                  type="textarea"
                  id="form3Example4"
                  class="form-control"
                />
                <label class="form-label" for="form3Example4">
                  Message
                </label>
              </div>

              <button
                data-mdb-ripple-init
                type="button"
                class="btn btn-dark btn-block mb-4"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
      <hr></hr>
      <footer className="home-footer">
        <h4>Flux Meet</h4>
        <p>
          © Copyright <strong>FLUX MEET</strong>. All Rights Reserved.
        </p>
        <div className="social-icons">
          <a href="https://www.google.com/search?client=firefox-b-d&q=coffee+expert+github">
            <GoogleIcon />
          </a>
          <a href="https://github.com/Coffee-Expert/Flux-Meet">
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
