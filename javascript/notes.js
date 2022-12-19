//Global query selectors

const noteContainer = document.querySelector('.note-container');
const modalContainer = document.querySelector('.modal-container');
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const checkedBox = document.getElementById('flexCheckDefault');

//Set current date on list
let options = { weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();
date.innerHTML = today.toLocaleDateString("fi-FI", options);

//Creating a new note

class Note{
    constructor(title, body) {
        this.title = title;
        this.today = new Date();
        this.body = body;
        this.id = Math.random();
    }
}
//Fuction: Add important mark to a note

//Function: Create a new note in UI

function addNoteToList(note) {
    const newListNote = document.createElement('div');
    newListNote.classList.add('note'); 
    newListNote.innerHTML = `
    <span hidden>${note.id}</span>
    <h2 class="note_title">${note.title}</h2>
    <p class="note_today">${note.today}</p>
    <p class="note_body">${note.body}</p>
    <div class="note_btns">
        <button class="note_btn note_view">Katso tarkemmin</button>
        <button class="note_btn note_delete">Poista viesti</button>
    </div>
    `;
    noteContainer.appendChild(newListNote);
}

// Function: Show alert message

function showAlertMessage(message, alertClass) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `message ${alertClass}`;
    alertDiv.appendChild(document.createTextNode(message));
    form.insertAdjacentElement('beforebegin', alertDiv);
    titleInput.focus();
    setTimeout(()=> alertDiv.remove(), 2000);
}

// Function: View note in modal

function activateNoteModal(title, body) {
    const modalTitle = document.querySelector('.modal_title');
    const modalBody = document.querySelector('.modal_body');
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modalContainer.classList.add('active');
}

// Close Modal

const modalButton = document.querySelector('.modal_btn').addEventListener('click', () => {
    modalContainer.classList.remove('active');
})



// Note Buttons

noteContainer.addEventListener('click', (e) => {
    if( e.target.classList.contains('note_view')) {
        const currentNote = e.target.closest('.note');
        const currentTitle = currentNote.querySelector('.note_title').textContent;
        const currentDate = currentNote.querySelector('.note_today').textContent;
        const currentBody = currentNote.querySelector('.note_body').textContent;
        activateNoteModal(currentTitle, currentDate, currentBody);
    }
    if( e.target.classList.contains('note_delete')) {
        const currentNote = e.target.closest('.note');
        showAlertMessage('Viesti pysyvästi poistettu.', 'remove-message');
        currentNote.remove();
    }
})

// Note Form Submit

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //const titleInput = document.querySelector('#title');
    const noteInput = document.querySelector('#note');

    //validate input selectors
    if( titleInput.value.length > 0 && noteInput.value.length > 0) {
        const newNote = new Note(titleInput.value, noteInput.value);
        addNoteToList(newNote);
        titleInput.value = '';
        noteInput.value = '';
        showAlertMessage('Viesti lisätty onnistuneesti!', 'success-message');
        titleInput.focus();
    } else {
        showAlertMessage('Anna otsikko ja viesti.', 'alert-message');
    }
})