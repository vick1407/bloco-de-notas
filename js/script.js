/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */

 let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
 let btncloseModal=  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
 let modal = document.querySelector('#modal'); //Modal para edição das notas
 let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
 let notes = document.querySelector('#notes');//Lista divs com dados das notas
 let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
 let btnCloseNote = document.querySelector("#close-modal-view");//icone para fechar modal de edição de nota.
 
 /*===================== Função e Eventos  ===========================*/
 
 addNote.addEventListener("click", (evt) =>{
     evt.preventDefault();
     modal.style.display = "block";
     addNote.style.display = "none";
     notes.style.display = "none";
 });
 btncloseModal.addEventListener("click", (evt) =>{
     evt.preventDefault();
     modal.style.display = "none";
     addNote.style.display = "block";
     notes.style.display = "flex";
 });
 btnSaveNote.addEventListener("click", (evt) =>{
     evt.preventDefault();
     data = {
         id: document.querySelector("#input-id").value,
         title: document.querySelector("#input-title").value ,
         content: document.querySelector("#input-content").value
     }
 
     saveNote(data);
 });
 
 btnCloseNote.addEventListener('click', (evt) =>{
     evt.preventDefault();
     modal.style.display = "none";
     addNote.style.display = "block";
     notes.style.display = "flex";
     modalView.style.display = "none";
 });
 
 /*===================== Funções  ===========================*/
 
 const saveNote = (note) => {
     console.log(note);
     let notes=loadNotes();
 
     if(note.id.trim().length < 1){ //Trim, usa-se quando é preciso remover espaços, "sujeiras"
         note.id = new Date().getTime;
     }
     
     else{
         //??
     }
 
     note.lastTime = new Date().getTime();
 
 
     notes.push(note);
 
     notes = JSON.stringify(notes);
 
     localStorage.setItem('notes', notes);
 
 };
 
 const loadNotes = () =>{
     let notes = localStorage.getItem("notes");
     if(!notes){
         notes = [];//Representação do array
     }
     else{
         notes = JSON.parse(notes);
     }
     return notes;
 
 }
 
 const listNotes = () => {
    let listnotes = loadNotes();
    let notesContainer = document.querySelector('#notes'); // Correção: Selecionar o elemento de contêiner de notas

    listnotes.forEach((note) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        divCard.style.borderColor = '#1b85dc';
        let divCardBody = document.createElement('div');
        divCardBody.className = 'card-body'; // Correção: className em vez de classnama
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

        //----------Ícones----------//
        let divIconA = document.createElement('div');
        divIconA.className = 'Trash';
        divCardBody.appendChild(divIconA);
        let IconTrash = document.createElement('i');
        IconTrash.style.color = 'red';
        IconTrash.className = 'bi bi-trash';
        divIconA.appendChild(IconTrash);
        let divIconB = document.createElement('div');
        divIconB.className = 'Disk';
        divCardBody.appendChild(divIconB);
        let IconDisk = document.createElement('i');
        IconDisk.style.color = 'blue';
        IconDisk.className = 'bi bi-sd-card';
        divIconB.appendChild(IconDisk);

        notesContainer.appendChild(divCard); // Correção: Usar notesContainer em vez de notes

        divCard.addEventListener('click', (evt) => {
            showNote(note);
        })
    });
}

         //----------Incones----------//
         let divIconA = document.createElement('div');
         divIconA.className = 'Trash';
         divCardBody.appendChild(divIconA);
         let IconTrash = document.createElement('i');
         IconTrash.style.color = 'red';
         IconTrash.className = 'bi bi-trash';
         divIconA.appendChild(IconTrash);
         let divIconB = document.createElement('div');
         divIconB.className = 'Disk';
         divCardBody.appendChild(divIconB);
         let IconDisk = document.createElement('i');
         IconDisk.style.color = 'blue';
         IconDisk.className = 'bi bi-sd-card';
         divIconB.appendChild(IconDisk);
 
         notes.appendChild(divCard);
 
         divCard.addEventListener('click', (evt) =>{
             showNote(note);
         })
     ;
 
 
 const showNote = (note) =>{
     notes.style.display = 'none';
     addNote.style.display = 'none';
     modalView.style.display = 'block';
     document.querySelector('#title-note').innerText = note.title; //.innerHTML = "<h1>"+note.title+"</h1>";
     document.querySelector('#content-note').innerHTML = `<p>${note.content}</p>
     <p>Última alteração: ${DateFormat(note.lastTime)}</p>`;
 }
 
 const DateFormat = (timestamp) => {
     let date = new Date(timestamp);//Converte a data 
     date = date.toLocaleDateString("pt-BR");
     return date;
 };
 
 
 listNotes();