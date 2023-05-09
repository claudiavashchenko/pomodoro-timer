const taskContainer = document.querySelector(".task-container");
const submitButton = document.querySelector(".submit-button");

let tasks = [
    {
        name: "Practice CSS Animations",
        priority: 0
    },
    {
        name: "Dev Community Work",
        priority: 2
    },
    {
        name: "Algorithm Studies",
        priority: 1
    }
]
const descendingTasks = tasks.sort((taskA, taskB) => taskA.priority - taskB.priority)


function render() {
    descendingTasks.forEach(task => {
        const taskBlock = document.createElement("div")
        taskBlock.classList.add("task-block")
        const deleteElement = document.createElement("p")
        deleteElement.classList.add("delete-icon")
        deleteElement.textContent = "☒"
        deleteElement.addEventListener("click", deleteTask)
        const title = document.createElement("p")
        const controller = document.createElement("button")
        controller.classList.add("controller-button")
        controller.textContent = "START"
        title.textContent = task.name
        taskBlock.append(deleteElement, title, controller)
        taskContainer.append(taskBlock)
    })
 
}
render()


function deleteTask(e) {
    e.target.parentNode.remove()
}

function addTask() {
    const inputElement = document.querySelector("input")
    const value = inputElement.value
    if(value) {
        taskContainer.innerHTML = ""
        tasks.push({
            name: value,
            priority: tasks.length
        })
        render()
    }
}
submitButton.addEventListener("click", addTask)