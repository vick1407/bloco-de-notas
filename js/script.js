let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btnCloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelectorAll('.item-note');//Lista divs com dados das notas
let btnSaveModal = document.querySelector("#btn-save-modal"); //icone para salvar nota

addNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.style.display = "block";
    addNote.style.display = "none";
    notes.style.display = "none";
});

btnCloseModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
});

btnSaveModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    data = {
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value,
        content: document.querySelector("#input-content").value
    }

    SaveModal(data);

});

const SaveModal = (note) => {
    console.log(note);
    let notes = localStorage.getItem("notes");

    if(notes){
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    console.log(note.id);
    if(note.id.lenghts)
        note.id = new Date().getTime();
    
    notes.push(note);

    notes = JSON.stringify(notes);

    localStorage.setItem("notes", notes);
};

if(note.id.trin().lenghts < 1){

note.id = new Date().getTime();

}else{
    //?
}

note.lastTime = new Date().getTime();
note.push(note);
notes = JSON.stringify(notes);
localStorage.setItem('notes', notes )


const saveNote = (note) => {
    let notes = localStorage
}

const loadNotes = () => {
    let notes = localStorage.getItem('notes');
    if(notes){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }
    return notes;
}

const listNotes =() => {

} 

listNotes();

