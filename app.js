//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".add-item__input");//Add a new task.
var addButton=document.querySelector(".add-item__button");//first button
var todoListHoder=document.querySelector(".todo__list");//ul of #incomplete-tasks
var completedListHolder=document.querySelector(".completed__list");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement("li");

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbx
  //label
  var label=document.createElement("label");//label
  //input (text)
  var editInput=document.createElement("input");//text
  //button.edit
  var editButton=document.createElement("button");//edit button

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image

  label.innerText=taskString;
  label.className="task-form__label task";

  //Each elements, needs appending
  listItem.className="task-form";
  
  checkBox.type="checkbox";
  checkBox.className="task-form__checkbox"

  editInput.type="text";
  editInput.className="task-form__text-input task";

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.className="task-form__edit-button button";

  deleteButton.className="task-form__delete-button button";
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.className="task-form__delete-img"
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to todoListHoder
  todoListHoder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.parentNode;

  var editInput=listItem.querySelector(".task-form__text-input");
  var label=listItem.querySelector(".task-form__label");
  var editBtn=listItem.querySelector(".task-form__edit-button ");
  var containsClass=listItem.classList.contains("task-form_edit");
  //If class of the parent is .editmode
  if(containsClass){

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("task-form_edit");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  completedListHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem=this.parentNode;
  todoListHoder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
//select ListItems children
  var checkBox=taskListItem.querySelector(".task-form__checkbox");
  var editButton=taskListItem.querySelector(".task-form__edit-button");
  var deleteButton=taskListItem.querySelector(".task-form__delete-button");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over todoListHoder ul list items
//for each list item
for (var i=0; i<todoListHoder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoListHoder.children[i],taskCompleted);
}




//cycle over completedListHolder ul list items
for (var i=0; i<completedListHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedListHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.