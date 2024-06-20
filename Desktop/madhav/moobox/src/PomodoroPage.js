import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import cowImage from "./cow.png"; // Import your cow image

const PomodoroPage = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [spotifyUrl, setSpotifyUrl] = useState(
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
  );

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
              if (isBreak) {
                setMinutes(pomodoroTime);
                setIsBreak(false);
              } else {
                setMinutes(breakTime);
                setIsBreak(true);
              }
              setSeconds(0);
              setIsActive(true);
            }, 3000);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && minutes !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, pomodoroTime, breakTime]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(pomodoroTime);
    setSeconds(0);
    setIsBreak(false);
  };

 const handleChange = (e) => {
   const { name, value } = e.target;
   let newValue = parseInt(value); 
   if (newValue < 0) {
     newValue = 0;
   }

   if (name === "pomodoroTime") {
     setPomodoroTime(newValue);
     setMinutes(newValue);
     setSeconds(0);
   } else if (name === "breakTime") {
     setBreakTime(newValue);
   }
 };

  const handleSpotifyChange = (e) => {
    setSpotifyUrl(e.target.value);
  };

  return (
    <div
      className={`${
        isBreak ? "bg-[#f5f5dc]" : "bg-[#ffffff]"
      } text-primary flex flex-col relative`}
    >
      <header className="bg-[#eee8aa] text-black p-4 flex justify-center items-center">
        <div className="text-2xl font-bold">Pomodoro Timer</div>
      </header>

      <main className="flex relative pb-16">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center p-6">
            <div className="text-6xl font-bold">
              {`${minutes < 10 ? `0${minutes}` : minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`}
            </div>
            <div className="mt-4">
              <button
                onClick={handleStart}
                className="px-4 py-2 border bg-white bg-secondary text-black rounded mr-2"
              >
                Start
              </button>
              <button
                onClick={handlePause}
                className="px-4 py-2 bg-accent bg-white border text-black rounded mr-2"
              >
                Pause
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-primary bg-white border text-black rounded"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-6 bg-white border-black rounded shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="mb-4">
              <label className="block text-gray-700">
                Pomodoro Duration (minutes):
              </label>
              <input
                type="number"
                name="pomodoroTime"
                value={pomodoroTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Break Duration (minutes):
              </label>
              <input
                type="number"
                name="breakTime"
                value={breakTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
        </div>

        <Draggable bounds="parent">
          <div className="w-70 p-4 absolute top-8 left-10">
            <iframe
              src={spotifyUrl}
              width="100%"
              height="380"
              frameBorder="0"
              allow="encrypted-media"
              allowTransparency="true"
              className="rounded shadow-md"
            ></iframe>
            <div className="mt-4">
              <label className="block text-gray-700">
                Enter any Spotify Playlist URL:
              </label>
              <input
                type="text"
                value={spotifyUrl}
                onChange={handleSpotifyChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Spotify Playlist URL"
                rows={1}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </Draggable>
      </main>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">
              {isBreak ? "Work Time!" : "Break Time!"}
            </h2>
            <p>{isBreak ? "Time to focus again!" : "Take a short break."}</p>
          </div>
        </div>
      )}

      {isBreak && (
        <div className="absolute bottom-0 justify-center w-full flex">
          <img
            src={cowImage}
            alt="Cow"
            className="h-16 mr-4 animate-cow-walk"
          />
        </div>
      )}
    </div>
  );
};

export default PomodoroPage;
