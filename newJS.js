"use strict";
const outputSection = document.querySelector("#output-section");
outputSection.innerHTML = "";

const writingArea = document.querySelector("#writing-area");
const form = document.querySelector("#form");

class App {
  #todoList = [];
  #html;
  constructor() {
    //form can write agenda to output section
    form.addEventListener("submit", this._addAgenda.bind(this));
    //delete button takes off agenda clicked
    outputSection.addEventListener("click", this._removeAgenda.bind(this));
    //write previous agenda to the page
    this._getAgenda();
  }

  _addAgenda(e) {
    //prevent page from reloading
    e.preventDefault();
    //block
    if (writingArea.value === "") return;
    //returns the html needed to add to outputsection
    const fullHTML = this.getAgendaHTML(writingArea.value);
    //adding the html to window
    outputSection.insertAdjacentHTML("beforeend", fullHTML);
    //clear writing area
    writingArea.value = "";
    //add agenda to todoList array for local storage
    this.#todoList.push(fullHTML);
    //add agenda to localstorage
    this._storeAgenda(fullHTML);
  }
  getAgendaHTML(writing) {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const AMorPM = date.getHours() > 12 ? "PM" : "AM";
    const minute = String(date.getMinutes()).padStart(2, "0");

    return (this.#html = `
      <div class="todo-div">
            <h1 class="text-content">${writing}</h1>
            <button class="delete-btn">x</button>
            <p class="date-p">${month}/${day}/${year} --- requested @ ${hour}:${minute} ${AMorPM}</p>
        </div>`);
  }

  _removeAgenda(e) {
    //makes sure that the target is  button
    if (e.target.tagName !== "BUTTON") return;
    const target = e.target.closest(".todo-div");
    outputSection.removeChild(target);
    //removes element from #todoList
    this.#todoList.splice(this.#todoList.indexOf(target.outerHTML), 1);
    //correct local storage
    localStorage.setItem("agendas", JSON.stringify(this.#todoList));
  }
  _storeAgenda(html) {
    localStorage.setItem("agendas", JSON.stringify(this.#todoList));
  }
  _getAgenda() {
    if (localStorage.getItem("agendas") === null) return;
    const data = JSON.parse(localStorage.getItem("agendas")).map((el) =>
      el.trim()
    );
    if (data === "") return;
    this.#todoList = data;
    data.forEach((el) => outputSection.insertAdjacentHTML("beforeend", el));
  }
}
const app = new App();
