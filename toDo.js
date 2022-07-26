"use strict";
const outputSection = document.querySelector("#output-section");
outputSection.innerHTML = "";

const writingArea = document.querySelector("#writing-area");
const publishBtn = document.querySelector(".default-btn");

const cutAndPrintFunc = function (e) {
  e.preventDefault();
  //take writing in and print it to the current agenda
  // clear the writing area
  if (writingArea.value != "") {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const AMorPM = date.getHours() > 12 ? "PM" : "AM";
    const minute = String(date.getMinutes()).padStart(2, "0");

    // create an actual div element using createElement
    const todoItem = document.createElement("div");
    //add the todo class to item
    todoItem.classList.add("todo-div");
    //writing the todo card
    todoItem.innerHTML = `
    <h1 class="text-content">${writingArea.value}</h1>
    <button class="delete-btn">x</button>
    <p class="date-p">${month}/${day}/${year} --- requested @ ${hour}:${minute} ${AMorPM} </p>
`;
    //append the div to the output section
    outputSection.appendChild(todoItem);
    //clear writing area
    writingArea.value = "";
  }
};

//publish text by hitting enter or pressing the plus sign in textbox
publishBtn.addEventListener("click", cutAndPrintFunc);

//add event listener to whole output section and check if it is the delete button
outputSection.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete-btn")) {
    //Do not update page

    //removing child element inside the output section using
    //closest
    outputSection.removeChild(evt.target.closest(".todo-div"));
  }
});
