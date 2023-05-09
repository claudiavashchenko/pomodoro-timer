const taskContainer = document.querySelector(".task-container");


function render() {
   const taskBlock = document.createElement("div")
   taskBlock.classList.add("task-block")
   const deleteElement = document.createElement("p")
   deleteElement.classList.add("delete-icon")
   deleteElement.textContent = "☒"
   const title = document.createElement("p")
   const controller = document.createElement("button")
   controller.classList.add("controller-button")
   controller.textContent = "START"
   title.textContent = "Business Class"
   taskBlock.append(deleteElement, title, controller)
   taskContainer.append(taskBlock)
}

render()