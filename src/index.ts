/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import {v4} from "uuid";

type Task = {
    id: string,
    title: string|undefined,
    completed: boolean
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = <HTMLFormElement | null>document.getElementById("new-task-form") 
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks : Task[] = loadTasks();
tasks.forEach(addToList);

form?.addEventListener("submit",e=>{ 
    e.preventDefault();
    
    if(input?.value=="" || input?.value == null) return;
    
    const newTask:Task = {
        id: v4(),
        title: input?.value,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();

    addToList(newTask);
    input.value = "";
});

function addToList(task: Task) {
    const item: HTMLLIElement = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const label = document.createElement("label");

    checkbox.checked = task.completed;
    label.append(checkbox, task.title as string);
    item.append(label);
    list?.append(item);
}


function saveTasks(){
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}


function loadTasks() : Task[] {
    const tasksJson = localStorage.getItem("TASKS");
    if(tasksJson==null) return [];
    return JSON.parse(tasksJson);
}


