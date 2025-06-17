let knownParticipants = {};
let meetStartTime = null;

// Fetch start time from Chrome storage
chrome.storage.local.get("meetStartTime", (data) => {
  if (data.meetStartTime) {
    const now = new Date();
    const [h, m] = data.meetStartTime.split(":").map(Number);
    now.setHours(h, m, 0, 0);
    meetStartTime = now;
    console.log("Meet Start Time:", meetStartTime.toLocaleTimeString());
  }
});

function getParticipants() {
  const names = new Set();
  document.querySelectorAll('[data-participant-name], [data-self-name]').forEach(el => {
    const name = el.innerText.trim();
    if (name) names.add(name);
  });
  return Array.from(names);
}

setInterval(() => {
  if (!meetStartTime) return;

  const participants = getParticipants();

  participants.forEach(name => {
    if (!knownParticipants[name]) {
      const joinTime = new Date();
      knownParticipants[name] = {
        name,
        joinedAt: joinTime.toLocaleTimeString(),
        late: joinTime > meetStartTime
      };

      console.log(`[JOIN] ${name} at ${joinTime.toLocaleTimeString()} - ${joinTime > meetStartTime ? "LATE" : "ON TIME"}`);
    }
  });

  chrome.storage.local.set({ participants: knownParticipants });

}, 5000); // every 5 seconds
