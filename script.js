let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const olay = document.getElementById('olay');
const olaytip = document.getElementById('olaytip');
const aciklama = document.getElementById('aciklama');
const tarih = document.getElementById('tarih');

const weekdays = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

function load() {

  if (sessionStorage.getItem("email") != localStorage.getItem("email")) {
    window.open("login.html","_self");
  }
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('tr-tr', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('tr-tr', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 0; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {

      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
       
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare); 
       
  }
}

function logout(params) {  
  sessionStorage.clear();
  window.open("login.html");
}

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);
  


  if (eventForDay) {

    var date = new Date(eventForDay.tarih);

    document.getElementById('eventOlay').innerText = eventForDay.olay;
    document.getElementById('eventolaytip').innerText = eventForDay.olaytip;
    document.getElementById('eventaciklama').innerText = eventForDay.aciklama;
    document.getElementById('eventTarih').innerText = date.toLocaleString();
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function closeModal() {
  
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  //olay.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (olay.value) {
    

    events.push({
      date: clicked,
      olay:olay.value,
      olaytip:olaytip.value,
      aciklama:aciklama.value,
      tarih: tarih.value,
      title: olay.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    olay.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();