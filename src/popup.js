document.addEventListener("DOMContentLoaded", function () {
  const urlInput = document.getElementById("urlInput");
  const blockButton = document.getElementById("blockButton");
  const blockedList = document.getElementById("blockedList");

  blockButton.addEventListener("click", function () {
    const url = urlInput.value.trim();
    if (url) {
      chrome.storage.sync.get("blockedWebsites", function (data) {
        const blockedWebsites = data.blockedWebsites || [];
        if (!blockedWebsites.includes(url)) {
          blockedWebsites.push(url);
          chrome.storage.sync.set({ blockedWebsites }, function () {
            updateBlockedList();
          });
        }
      });
    }
    urlInput.value = "";
  });

  function updateBlockedList() {
    chrome.storage.sync.get("blockedWebsites", function (data) {
      const blockedWebsites = data.blockedWebsites || [];
      blockedList.innerHTML = "";
      blockedWebsites.forEach((url) => {
        const blockItem = document.createElement("div");
        blockItem.className = "block-item";
        blockItem.textContent = url;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
          const index = blockedWebsites.indexOf(url);
          if (index > -1) {
            blockedWebsites.splice(index, 1);
            chrome.storage.sync.set({ blockedWebsites }, function () {
              updateBlockedList();
            });
          }
        });
        blockItem.appendChild(removeButton);
        blockedList.appendChild(blockItem);
      });
    });
  }

  updateBlockedList();
});
