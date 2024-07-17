import React, { useState, useEffect } from "react";

const FocusPage = () => {
  const [blockedWebsites, setBlockedWebsites] = useState([]);
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    chrome.storage.sync.get("blockedWebsites", (data) => {
      setBlockedWebsites(data.blockedWebsites || []);
    });
  }, []);

  const handleBlock = () => {
    const url = urlInput.trim();
    if (url && !blockedWebsites.includes(url)) {
      const updatedBlockedWebsites = [...blockedWebsites, url];
      setBlockedWebsites(updatedBlockedWebsites);
      chrome.storage.sync.set({ blockedWebsites: updatedBlockedWebsites });
      setUrlInput("");
    }
  };

  const handleUnblock = (url) => {
    const updatedBlockedWebsites = blockedWebsites.filter(
      (item) => item !== url
    );
    setBlockedWebsites(updatedBlockedWebsites);
    chrome.storage.sync.set({ blockedWebsites: updatedBlockedWebsites });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center">Focus Mode</h1>
      <div className="mt-8">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter website to block"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handleBlock}
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Block
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Blocked Websites</h2>
        <ul>
          {blockedWebsites.map((url) => (
            <li key={url} className="flex justify-between items-center mt-2">
              {url}
              <button
                onClick={() => handleUnblock(url)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FocusPage;
