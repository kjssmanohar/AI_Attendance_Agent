document.getElementById("set-time").addEventListener("click", () => {
  const timeStr = document.getElementById("start-time").value;
  if (timeStr) {
    chrome.storage.local.set({ meetStartTime: timeStr });
    alert("Start time set to " + timeStr);
  }
});

// Display late comers
chrome.storage.local.get("participants", (data) => {
  const list = document.getElementById("late-list");
  list.innerHTML = "";

  for (const [name, info] of Object.entries(data.participants || {})) {
    if (info.late) {
      const li = document.createElement("li");
      li.textContent = `${name} joined at ${info.joinedAt}`;
      list.appendChild(li);
    }
  }
});
