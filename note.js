const btnE1 = document.getElementById("btn");
const appE1 = document.getElementById("app");


getNotes().forEach((note)=>{
  const noteE1 = createNoteE1(note.id,note.content)
  appE1.insertBefore(noteE1, btnE1);
});

function createNoteE1(id,content){

  const element = document.createElement("textarea");
  element.classList.add("note")
  element.placeholder = "Empty Note";
  element.value = content;



  element.addEventListener("dblclick", ()=>{
    const warning = confirm("Do you want to delete this note ?")
    if(warning){
      deleteNote(id,element)
    }
  })


  element.addEventListener("input",()=>{
    updateNote(id,element.value)
  });
   return element;
}

function deleteNote(id , element){
  const notes = getNotes().filter((note)=>note.id != id)
  saveNote(notes)
  appE1.removeChild(element);



}


function updateNote(id , content){
   const notes = getNotes()
   const target = notes.filter((note)=>note.id == id)[0];
   target.content = content;
   saveNote(notes);

}


function addNote(){


  const notes = getNotes();
  const noteOBJ = {
    id: Math.floor(Math.random() * 100000),
    content:"",
  };
  const noteE1 = createNoteE1(noteOBJ.id,noteOBJ.content);
  appE1.insertBefore(noteE1,btnE1);

  notes.push(noteOBJ);


  saveNote(notes)
}


function saveNote(notes){ 
  localStorage.setItem("note-app", JSON.stringify(notes))

}

function getNotes(){
 return  JSON.parse(localStorage.getItem("note-app")  ||  "[]");

}


btnE1.addEventListener("click",addNote);