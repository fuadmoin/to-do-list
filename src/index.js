import "./style.css";
import select2 from "../img/select2.png";
import delete2 from "../img/delete2.png";
import edit from "../img/edit.png";
import save from "../img/save.png";


const container = document.getElementById('container');
const form = document.querySelector('form');
const input = document.querySelector('.inputText');
const ul = document.querySelector('.todoList');




class toDoItems{
    constructor(text, completed, index){
        this.text = text;
        this.completed = completed;
        this.index = index;    
    }

   static add(text){
    const todos = JSON.parse(window.localStorage.getItem('todoArray')) || []; 
   
                todos.push(text);
        localStorage.setItem("todoArray", JSON.stringify(todos));
       
     
    }
  

   static  displayAll(){
    ul.innerHTML="";
    const todos = JSON.parse(window.localStorage.getItem('todoArray')) || [];
        for( let i = 0; i < todos.length; i++ ){
            const itemDuplicate = document.querySelector(`[data-key='${todos[i].index}']`);
            
            const isCompleted = todos[i].completed ? 'complete' : '';
            const node = document.createElement('li');
          
            node.setAttribute('class', `todo-item ${isCompleted}`);
            node.setAttribute('data-key', todos[i].index);
           node.innerHTML='';
            node.innerHTML = ` 
            <input class="checkbox" id="${todos[i].index}" type="checkbox"/>
          <img class="select"  src=${select2} alt=""/> <img class="save"  src=${save} alt=""/>
            <img class="delete"  src=${delete2} alt=""/> <img class="edit"  src=${edit} alt=""/>
           <span class="items">${todos[i].text}</span>
        
            `;
            
           

          
                ul.append(node);
                const checkboxes =  document.querySelectorAll("input[type='checkbox']");
                const option2 = document.querySelectorAll('.select');
                const option3 = document.querySelectorAll('.delete');
                const option1 = document.querySelectorAll('.edit');
                const option = document.querySelectorAll('.save');

                option3[i].addEventListener('click', () =>{
                    toDoItems.remove(i);
                  
                });

                option2[i].addEventListener('click',() => {
                    option2[i].style.display = 'none';
                    option[i].style.display = 'block';
                    option1[i].style.display = 'block';
                    this.edit();
                });
             

             
               checkboxes[i].addEventListener('click', (event) => {
                  const itemKey = event.target.parentElement.dataset.key;
                  const parent = event.target.parentNode; 
                 if(checkboxes[i].checked){
                    todos[i].completed = true;
                  parent.classList.add('complete');
                  option2[i].style.display = 'none';
                  option[i].style.display = 'none';
                  option1[i].style.display = 'none';
                    localStorage.setItem("todoArray", JSON.stringify(todos));
                   
                 }
                 else{
                    option2[i].style.display = 'block';
                    todos[i].completed = false;
                  parent.classList.remove('complete');
                  localStorage.setItem("todoArray", JSON.stringify(todos));
                 }
                
               
               });
                   
               if(todos[i].completed === true){
                checkboxes[i].checked = true;
               }
               else{
                checkboxes[i].checked = false;
               }
         
              
        
         }
    }

  static  edit(){
    const todos = JSON.parse(window.localStorage.getItem('todoArray')) || []; 
        const tasks = document.querySelectorAll('.todoList li');
        for (let i = 0; i < tasks.length; i++) {
            const option1 = document.querySelectorAll('.edit');
            const option2 = document.querySelectorAll('.select');
            const option = document.querySelectorAll('.save');
            let input4 = document.createElement("input");
          
             option1[i].addEventListener('click',(event) => {
                 
                const key = todos[i].index;
                const item = todos.findIndex((item) => item.index === key);
                const text = todos[item].text;
                
                input4.setAttribute('class','editable');
                input4.type = "text";
                
                input4.value = text;
                tasks[i].lastChild.replaceWith(input4);
               
               
                });

               
     option[i].addEventListener('click',() => {
                    let span = document.createElement("span");
   span.textContent = input4.value;
   
   let key = todos[i].index;
   let task = todos.find(t => t.index == key);
   if(input4.value !==''){
   task.text = span.textContent;
             
   localStorage.setItem("todoArray", JSON.stringify(todos));
   
   toDoItems.displayAll();
   

}

input4.setAttribute("class", 'disabled');
   option2[i].style.display = 'block';
                    option[i].style.display = 'none';
                    option1[i].style.display = 'none';
   

                });
        }
        
    }
 static remove(i){
    let todos = JSON.parse(window.localStorage.getItem('todoArray')) || []; 

  let key = todos[i].index;
  let task = todos.find(t => t.index == key);

  todos = todos.filter( (item) =>{
    return item !== task;
  });
  localStorage.setItem("todoArray", JSON.stringify(todos));
  let todos2 = JSON.parse(window.localStorage.getItem('todoArray')) || []; 

  for (let i = 1; i <= todos2.length; i++) {
todos2[i-1].index= i;
  }
  localStorage.setItem("todoArray", JSON.stringify(todos2));

  this.displayAll();
 
    }



   static removeAll(){
        let todos = JSON.parse(window.localStorage.getItem('todoArray')) || []; 
        const tasks = document.querySelectorAll('.todoList li');
        let tobeDeleted = [];
        for (let i = 0; i < tasks.length; i++) {
const checkboxes =  document.querySelectorAll("input[type='checkbox']");
if(checkboxes[i].checked){
   
    let key = todos[i].index;
    let task = todos.find(t => t.index == key);
    tobeDeleted.push(task);
}
} 



  todos = todos.filter((item) =>{
    return !tobeDeleted.includes(item);
  });
  localStorage.setItem("todoArray", JSON.stringify(todos));
  let todos2 = JSON.parse(window.localStorage.getItem('todoArray')) || []; 

  for (let i = 1; i <= todos2.length; i++) {
todos2[i-1].index= i;
  }
  localStorage.setItem("todoArray", JSON.stringify(todos2));
        this.displayAll();
    }
}



form.addEventListener('submit', (event) => {
event.preventDefault();

const inputed = input.value;
if(input !==''){
const todos = JSON.parse(window.localStorage.getItem('todoArray')) || []; 
const length = todos.length + 1;
const todo = new toDoItems(inputed, false, length );
toDoItems.add(todo);
toDoItems.displayAll();
input.value = '';
input.focus();
}

});
const btnDeleteAll = document.createElement('button');
btnDeleteAll.setAttribute('class', 'delete-all');
btnDeleteAll.textContent = 'Clear all completed';
container.append(btnDeleteAll);

btnDeleteAll.addEventListener('click', () =>{
toDoItems.removeAll();
});
window.onload =toDoItems.displayAll();
    







