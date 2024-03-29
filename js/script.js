let addNote = document.querySelector('#add-note'); //Botão de para adicionar nota
let btnCloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let bntCloseNote = document.querySelector("#close-modal-view");


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
    modalView.style.display = "none"
});

btnSaveNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    data = {
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value,
        content: document.querySelector("#input-content").value
    }

    SaveNote(data);

});

const SaveNote = (note) => {
    let notes = loadNotes();

    if(note.id.trim().length < 1){
        note.id = new Date().getTime();
    }

    note.lastTime = new Date().getTime();

    notes.push(note);

    notes = JSON.stringify(notes);

    localStorage.setItem('notes', notes);

};

const loadNotes = () => {
    let notes = localStorage.getItem('notes');

    if(!notes){
        notes = [];
    }
    else{
        notes = JSON.parse(notes);
    }
    return notes;
}

const listNotes =  () =>{
    let listNotes = loadNotes();
    listNotes.forEach((note) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        let divCardBody = document.createElement('div');
        divCardBody.className = 'card-body';
        divCard.appendChild(divCardBody);
        let h5 = document.createElement('h5');
        h5.innerText = note.title;
        divCardBody.appendChild(h5);
        let pContent = document.createElement('p');
        pContent.innerText = note.content;
        let plastTime = document.createElement('p');
        plastTime.innerText = "Atualizado em:"+dateFormat(note.lastTime);

        divCardBody.appendChild(pContent);
        divCardBody.appendChild(pLastTime);

        notes.appendChild(divCard);

        divCard.addEventListener('click'), (evt) =>{
            showNote(note);
        }
}); 

const showNote = (note) =>{
        notes.style.display = 'none';
        addNotes.style.display = 'none';
        modalView.style.display = 'block';
        document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
        document.querySelector('content-notes').innerHTML = '<p> ${note.content} </p> <p>Ultima Alteração : ${dateFormat(note.lastTime)}</p>'
};

const dateFormat = (timestamp) =>{
    let  datetime = new Date (note.lastTime);
    let time = new Date (note.lastTime);
    time = time.toLocaleDateString("pt-br");
}

listNotes();

};