const taskContainer = document.querySelector(".task-container");
const submitButton = document.querySelector(".submit-button");
const timeLeftDisplay = document.querySelector("#time-left");
const sliderFill = document.querySelector(".fill")

const startCount = 5

let timeLeft = startCount
let timerId

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

function countDown() {
    timerId = setInterval(() => {
        timeLeft--
        timeLeftDisplay.textContent = timeLeft
        sliderFill.style.width = (timeLeft / startCount) * 100 + "%"
        if(timeLeft <= 0) {
            clearInterval(timerId)
        }
    }, 1000)
}
countDown()


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
        inputElement.value = ""
        tasks.push({
            name: value,
            priority: tasks.length
        })
        render()
    }
}
submitButton.addEventListener("click", addTask)