const taskContainer = document.querySelector(".task-container");
const submitButton = document.querySelector(".submit-button");
const timeLeftDisplay = document.querySelector("#time-left");
const sliderFill = document.querySelector(".fill")

const startCount = 25 * 60

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

function convertToMin(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft - minutes * 60
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
}

function handleClick(button) {

   switch(button.textContent) {
    case "ACTIVE":
        button.textContent = "PAUSED"
        clearInterval(timerId)
        break
    case "PAUSED":
        button.textContent = "ACTIVE"
        countDown(button)
        break
    default:
        const allButtons = document.querySelectorAll(".controller-button")
        allButtons.forEach(button => {
           button.textContent = "START"
           button.classList.remove("active-button")
           clearInterval(timerId)
           timeLeft = startCount
           timeLeftDisplay.textContent = convertToMin(timeLeft)
        })

        button.textContent = "ACTIVE"
        button.classList.add("active-button")
        countDown(button)
        break
   }

 
}

function countDown(button) {
    timerId = setInterval(() => {
        timeLeft--
        timeLeftDisplay.textContent = convertToMin(timeLeft)
        sliderFill.style.width = (timeLeft / startCount) * 100 + "%"
        if(timeLeft <= 0) {
            clearInterval(timerId)
           delete descendingTasks[button.id]
           button.parentNode.remove()
           timeLeft = startCount
           timeLeftDisplay.textContent = convertToMin(timeLeft)
        }
    }, 1000)
}



function render() {
    descendingTasks.forEach((task, index) => {
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
        controller.id = index
        controller.addEventListener("click", () => handleClick(controller))
        title.textContent = task.name
        taskBlock.append(deleteElement, title, controller)
        taskContainer.append(taskBlock)
    })
 
}
render()


function deleteTask(e) {
    e.target.parentNode.remove()
    delete descendingTasks[e.target.parentNode.lastChild.id]
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