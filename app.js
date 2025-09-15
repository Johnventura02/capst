// app.js

// Utility: save and load from localStorage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Render function for lists
function renderList(containerId, data, formatter) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = formatter(item, index);
    container.appendChild(div);
  });
}

// ================= BULLETINS =================
const bulletins = loadData("bulletins");

function renderBulletins() {
  renderList("bulletin-list", bulletins, (item, i) => `
    <h3>${item.title}</h3>
    <p>${item.content}</p>
    <button onclick="deleteBulletin(${i})">Delete</button>
  `);
}

document.getElementById("bulletin-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = e.target.title.value;
  const content = e.target.content.value;
  bulletins.push({ title, content });
  saveData("bulletins", bulletins);
  renderBulletins();
  e.target.reset();
});

function deleteBulletin(index) {
  bulletins.splice(index, 1);
  saveData("bulletins", bulletins);
  renderBulletins();
}

// ================= ANNOUNCEMENTS =================
const announcements = loadData("announcements");

function renderAnnouncements() {
  renderList("announcement-list", announcements, (item, i) => `
    <h3>${item.title} <small>(${item.category})</small></h3>
    <p>${item.details}</p>
    <button onclick="deleteAnnouncement(${i})">Delete</button>
  `);
}

document.getElementById("announcement-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = e.target.title.value;
  const category = e.target.category.value;
  const details = e.target.details.value;
  announcements.push({ title, category, details });
  saveData("announcements", announcements);
  renderAnnouncements();
  e.target.reset();
});

function deleteAnnouncement(index) {
  announcements.splice(index, 1);
  saveData("announcements", announcements);
  renderAnnouncements();
}

// ================= CALENDAR =================
const events = loadData("calendar");

function renderCalendar() {
  renderList("calendar-list", events, (item, i) => `
    <h3>${item.event}</h3>
    <p>${new Date(item.datetime).toLocaleString()}</p>
    <button onclick="deleteEvent(${i})">Delete</button>
  `);
}

document.getElementById("calendar-form").addEventListener("submit", e => {
  e.preventDefault();
  const event = e.target.event.value;
  const datetime = e.target.datetime.value;
  events.push({ event, datetime });
  saveData("calendar", events);
  renderCalendar();
  e.target.reset();
});

function deleteEvent(index) {
  events.splice(index, 1);
  saveData("calendar", events);
  renderCalendar();
}

// ================= GROUPS =================
const groups = loadData("groups");

function renderGroups() {
  renderList("group-list", groups, (item, i) => `
    <h3>${item.name}</h3>
    <button onclick="deleteGroup(${i})">Delete</button>
  `);
}

document.getElementById("group-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = e.target.name.value;
  groups.push({ name });
  saveData("groups", groups);
  renderGroups();
  e.target.reset();
});

function deleteGroup(index) {
  groups.splice(index, 1);
  saveData("groups", groups);
  renderGroups();
}

// ================= INIT =================
renderBulletins();
renderAnnouncements();
renderCalendar();
renderGroups();