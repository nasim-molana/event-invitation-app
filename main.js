const participants = [];

const list = document.getElementById('participantList');
const addBtn = document.getElementById('addParticipant');
const fNameInp = document.getElementById('fName');
const lNameInp = document.getElementById('lName');
const emailInp = document.getElementById('email');


addBtn.addEventListener('click', () => {
    const fName = fNameInp.value.trim();
    const lName = lNameInp.value.trim();
    const email = emailInp.value.trim();

    if (!fName || !lName || !email) {
        alert('Alle Teilnehmer-Felder ausfüllen');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Ungültige E-Mail-Adresse');
        return;
    }

    const participant = {
        id: Date.now(),
        fName,
        lName,
        email
    };

    participants.push(participant);

    const li = document.createElement('li');
    li.textContent = `${fName} ${lName} – ${email}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '✖';
    delBtn.onclick = () => {
        const index = participants.findIndex(p => p.id === participant.id);
        participants.splice(index, 1);
        li.remove();
    };

    li.appendChild(delBtn);
    list.appendChild(li);

    fNameInp.value = lNameInp.value = emailInp.value = '';
});

document.getElementById('invitationForm').addEventListener('submit', e => {
    e.preventDefault();
    const dateValue = document.getElementById('date').value;
    const selectedDate = new Date(dateValue);
    if (!dateValue || Number.isNaN(selectedDate.getTime())) {
        alert('Bitte ein gültiges Datum auswählen');
        return;
    }

if (selectedDate.getTime() < Date.now()) {
        alert('Das Datum muss in der Zukunft liegen');
        return;
    }
    if (participants.length === 0) {
        alert('Mindestens ein Teilnehmer erforderlich');
        return;
    }

    alert('Einladungen wurden versendet (Simulation)');
    console.log('Teilnehmer:', participants);
});

const toggleBtn = document.getElementById('toggleTheme');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️ Light Mode';
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');
    toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

