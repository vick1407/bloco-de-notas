
let addNote = document.querySelector('#add-note');
let btncloseModal = document.querySelector('#btn-close-modal'); 
let modal = document.querySelector('#modal'); 
let modalView = document.querySelector('#modal-view'); 
let notes = document.querySelector('#notes'); 
let btnSaveNote = document.querySelector("#btn-save-note"); 
let btnCloseNote = document.querySelector("#close-modal-view"); 

/*===================== Função e Eventos  ===========================*/

addNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.style.display = "block";
    addNote.style.display = "none";
    notes.style.display = "none";
});


btncloseModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
});


btnSaveNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    let data = {
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value,
        content: document.querySelector("#input-content").value
    };
    saveNote(data);
});


btnCloseNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
    modalView.style.display = "none";
});

/*===================== Funções  ===========================*/


const saveNote = (note) => {
    console.log(note);
    let notesList = loadNotes();

    if (note.id.trim().length < 1) {
        note.id = new Date().getTime();
    }

    note.lastTime = new Date().getTime();

    notesList.push(note);

    notesList = JSON.stringify(notesList);

    localStorage.setItem('notes', notesList);
    displayNotes(); 
};


const loadNotes = () => {
    let notesList = localStorage.getItem("notes");
    if (!notesList) {
        notesList = [];
    } else {
        notesList = JSON.parse(notesList);
    }
    return notesList;
};


const displayNotes = () => {
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

        let pContent = document.createElement('p');
        pContent.innerText = note.content;
        divCardBody.appendChild(pContent);

        let pLastTime = document.createElement('p');
        pLastTime.innerText = "Atualizado em: " + DateFormat(note.lastTime);
        divCardBody.appendChild(pLastTime);

        notes.appendChild(divCard);

        
        divCard.addEventListener('click', () => {
            showNoteDetails(note);
        });
    });
};


const showNoteDetails = (note) => {
    notes.style.display = 'none';
    addNote.style.display = 'none';
    modalView.style.display = 'block';
    document.querySelector('#title-note').innerText = note.title;
    document.querySelector('#content-note').innerHTML = `<p>${note.content}</p>
    <p>Última alteração: ${DateFormat(note.lastTime)}</p>`;
    
    document.querySelector('#input-id').value = note.id;
};

const DateFormat = (timestamp) => {
    let date = new Date(timestamp);
    date = date.toLocaleDateString("pt-BR");
    return date;
};

displayNotes();
