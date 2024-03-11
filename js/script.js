let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btncloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('.item-notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
//let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

addNote.addEventListener("click", evt =>{
    evt.preventDefault();
    modal.style.dislpay = "block";
    addNote.style.display = "none";
    notes.style.display = "none";
});

btncloseModal.addEventListener("click", evt => {
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";


})