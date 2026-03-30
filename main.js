// ============================
// STATE
// ============================
const participants = [];


// ============================
// ELEMENTS
// ============================
const form = document.getElementById('event-form');

// Title
const titleInput = document.getElementById("title");
const titleError = document.getElementById("title-error");

// Date
const dateInput = document.getElementById('date');

// Form Error
const formError = document.getElementById("form-error");

// Participants
const list = document.getElementById('participants-list');
const addBtn = document.getElementById('add-participant');
const participantsError = document.getElementById("participants-error");

// Inputs (اگر وجود داشته باشن)
const fNameInp = document.getElementById('fName');
const lNameInp = document.getElementById('lName');
const emailInp = document.getElementById('email');


// ============================
// ERROR HANDLERS
// ============================
function showFormError(message) {
    formError.textContent = message;
    formError.classList.remove("hidden");
}

function clearFormError() {
    formError.textContent = "";
    formError.classList.add("hidden");
}

function showParticipantsError(message) {
    participantsError.textContent = message;
}

function clearParticipantsError() {
    participantsError.textContent = "";
}


// ============================
// VALIDATION FUNCTIONS
// ============================

// Title
function validateTitle() {
    const value = titleInput.value.trim();

    if (value === "") {
        titleInput.classList.add("input-error");
        titleInput.classList.remove("input-success");
        titleError.textContent = "Event title is required";
        return false;
    }

    if (value.length < 3) {
        titleInput.classList.add("input-error");
        titleInput.classList.remove("input-success");
        titleError.textContent = "Must be at least 3 characters";
        return false;
    }

    titleInput.classList.remove("input-error");
    titleInput.classList.add("input-success");
    titleError.textContent = "";

    return true;
}


// ============================
// EVENTS — REALTIME VALIDATION
// ============================
titleInput.addEventListener("input", validateTitle);


// ============================
// PARTICIPANTS LOGIC
// ============================
addBtn.addEventListener('click', () => {
    const fName = fNameInp?.value.trim();
    const lName = lNameInp?.value.trim();
    const email = emailInp?.value.trim();

    clearParticipantsError();

    if (!fName || !lName || !email) {
        showParticipantsError("All participant fields are required");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showParticipantsError("Invalid email address");
        return;
    }

    const participant = {
        id: Date.now(),
        fName,
        lName,
        email
    };

    participants.push(participant);

    renderParticipant(participant);

    // reset inputs
    fNameInp.value = "";
    lNameInp.value = "";
    emailInp.value = "";
});


// ============================
// RENDER FUNCTIONS
// ============================
function renderParticipant(participant) {
    const li = document.createElement('li');

    li.textContent = `${participant.fName} ${participant.lName} – ${participant.email}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '✖';

    delBtn.addEventListener('click', () => {
        removeParticipant(participant.id);
        li.remove();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
}

function removeParticipant(id) {
    const index = participants.findIndex(p => p.id === id);
    if (index !== -1) {
        participants.splice(index, 1);
    }
}


// ============================
// FORM SUBMIT
// ============================
form.addEventListener('submit', function (e) {

    clearFormError();

    const isTitleValid = validateTitle();

    if (!isTitleValid) {
        e.preventDefault();
        return;
    }

    const dateValue = dateInput.value;
    const selectedDate = new Date(dateValue);

    if (!dateValue || Number.isNaN(selectedDate.getTime())) {
        showFormError("Please select a valid date");
        e.preventDefault();
        return;
    }

    if (selectedDate.getTime() < Date.now()) {
        showFormError("Date must be in the future");
        e.preventDefault();
        return;
    }

    if (participants.length === 0) {
        showFormError("At least one participant is required");
        e.preventDefault();
        return;
    }

    // success (temporary)
    console.log("Invitations sent (simulation)");
});


// ============================
// THEME TOGGLE
// ============================
const toggleBtn = document.getElementById('toggleTheme');

if (toggleBtn) {
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
}