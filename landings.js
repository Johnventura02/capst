// landing.js

// Load stored data
function loadData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Render lists
function renderList(containerId, data, formatter) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  if (data.length === 0) {
    container.innerHTML = "<p>No posts available yet.</p>";
    return;
  }
  data.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = formatter(item);
    container.appendChild(div);
  });
}

// Render Bulletins
function renderBulletins() {
  const bulletins = loadData("bulletins");
  renderList("bulletin-list", bulletins, (item) => `
    <h3>${item.title}</h3>
    <p>${item.content}</p>
  `);
}

// Render Announcements
function renderAnnouncements() {
  const announcements = loadData("announcements");
  renderList("announcement-list", announcements, (item) => `
    <h3>${item.title} <small>(${item.category})</small></h3>
    <p>${item.details}</p>
  `);
}

// Render Calendar
function renderCalendar() {
  const events = loadData("calendar");
  renderList("calendar-list", events, (item) => `
    <h3>${item.event}</h3>
    <p>${new Date(item.datetime).toLocaleString()}</p>
  `);
}

// Render Groups
function renderGroups() {
  const groups = loadData("groups");
  renderList("group-list", groups, (item) => `
    <h3>${item.name}</h3>
  `);
}

// Init
renderBulletins();
renderAnnouncements();
renderCalendar();
renderGroups();