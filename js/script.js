let addNote = document.querySelector('#add-note');
let btncloseModal = document.querySelector('#btn-close-modal'); 
let modal = document.querySelector('#modal'); 
let modalView = document.querySelector('#modal-view'); 
let notes = document.querySelector('#notes'); 
let btnSaveNote = document.querySelector("#btn-save-note"); 
let btnCloseNote = document.querySelector("#close-modal-view"); 
let editingNoteId = null; // Adicionei essa linha para garantir que editingNoteId seja definido globalmente

/*===================== Função e Eventos  ===========================*/

addNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    editingNoteId = null;
    clearNoteInputs();
    modal.style.display = "block";
    addNote.style.display = "none";
    notes.style.display = "none";
});

btncloseModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    closeModal();
});

btnSaveNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    let data = {
        id: editingNoteId || new Date().getTime(),
        title: document.querySelector("#input-title").value,
        content: document.querySelector("#input-content").value
    };
    saveNote(data);
});

btnCloseNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeModal();
});

/*===================== Funções  ===========================*/

const saveNote = (note) => {
    note.lastTime = new Date().getTime(); // Adicionando lastTime
    let notesList = loadNotes();

    if (!editingNoteId) {
        notesList.push(note);
    } else {
        let existingNoteIndex = notesList.findIndex(item => item.id === editingNoteId);
        if (existingNoteIndex !== -1) {
            notesList[existingNoteIndex] = note;
        }
    }

    localStorage.setItem('notes', JSON.stringify(notesList));
    closeModal();
    listNotes();
};

const loadNotes = () => {
    let notesList = localStorage.getItem("notes");
    return notesList ? JSON.parse(notesList) : [];
};

const listNotes = () => {
    let notesList = loadNotes();
    notes.innerHTML = '';

    notesList.forEach((note) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        divCard.style.borderColor = '#1b85dc';

        let divCardBody = document.createElement('div');
        divCardBody.className = 'card-body';
        divCard.appendChild(divCardBody);

        let h5 = document.createElement('h5');
        h5.innerText = note.title;
        divCardBody.appendChild(h5);

        notes.appendChild(divCard);

        let pContent = document.createElement('p');
        pContent.innerText = note.content;
        divCardBody.appendChild(pContent);

        let pLastTime = document.createElement('p');
        pLastTime.innerText = "Atualizado em: " + DateFormat(note.lastTime);
        divCardBody.appendChild(pLastTime);

        divCard.addEventListener('click', () => {
            showNote(note);
        });
    });
};

const showNote = (note) => {
    editingNoteId = note.id;
    document.querySelector("#controls-note").innerHTML = '';
    notes.style.display = 'none';
    addNote.style.display = 'none';
    modalView.style.display = 'block';
    document.querySelector('#title-note').innerText = note.title;
    document.querySelector('#content-note').innerHTML = `<p>${note.content}</p>
    <p>Última alteração: ${DateFormat(note.lastTime)}</p>`;
    let divEdit = document.createElement("div");
    let iEdit = document.createElement("i");
    divEdit.className = "bi bi-pen";
    divEdit.appendChild(iEdit);
    document.querySelector("#controls-note").appendChild(divEdit);
    divEdit.addEventListener("click", evt =>{
        evt.preventDefault();
        document.querySelector("#input-id").value = note.id;
        document.querySelector("#input-title").value = note.title;
        document.querySelector("#input-content").value = note.content;
        modal.style.display="block";
        addNote.style.display ="none";
        notes.style.display = "none";
        modalView.style.display = "none";
    });

    let divDelete = document.createElement("div");
    let iDelete = document.createElement("i");
    divDelete.className = "bi bi-trash";
    divDelete.appendChild(iDelete);
    document.querySelector("#controls-note").appendChild(divDelete);
    divDelete.addEventListener("click", evt =>{
        evt.preventDefault();
        deleteNote(note.id);
    });
};

const deleteNote = (noteId) => {
    let notesList = loadNotes();
    notesList = notesList.filter(note => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(notesList));
    listNotes();
    closeModal();
};

const closeModal = () => {
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
    modalView.style.display = 'none';
    editingNoteId = null;
    clearNoteInputs();
};

const clearNoteInputs = () => {
    document.querySelector("#input-id").value = "";
    document.querySelector("#input-title").value = "";
    document.querySelector("#input-content").value = "";
};

const DateFormat = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR");
};

listNotes();
