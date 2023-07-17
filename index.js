const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    console.log("drag start");
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    console.log("drag end");
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    console.log("dragover..");
    // remove disable icon while dragging
    // by default dragging elment would be false
    e.preventDefault();
    const afterElement = getDragAfterContainer(container, e.clientY);
    // only select that element on which dragging class is applied
    // that means which element is being dragging
    console.log(afterElement);
    const draggable = document.querySelector(".dragging");
    if(afterElement == null){
      container.appendChild(draggable);
    }else{
      container.insertBefore(draggable , afterElement)
    }
  });
});

function getDragAfterContainer(container, y) {
  const draggableElement = [
    ...container.querySelectorAll(".draggable:not(.dragging)")
  ];
 return  draggableElement.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      }else{
        return closest
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
