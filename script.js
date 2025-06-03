
const myLibrary = [];
let container = document.querySelector(".container");
let addButton = document.querySelector("#add-button")

function Book(title, author, pages, isRead, id) {
    if (!new.target) {
        throw Error("Make it a new target.")
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
}

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead, crypto.randomUUID());
    myLibrary.push(newBook);
}

function displayBook(book) {        
    let newBook = document.createElement("div");
    newBook.classList.add("card")
    let title = document.createElement("h2");
    title.innerText = book.title;
    let author = document.createElement("h3");
    author.innerText = book.author;
    let pages = document.createElement("p");
    pages.innerText = `Pages: ${book.pages}`;
    let read = document.createElement("p");
    read.innerText = generateReadText(book.isRead);

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer")

    let id = book.id
    let readButton = document.createElement("button");
    readButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>book-open</title><path d="M13,12H20V13.5H13M13,9.5H20V11H13M13,14.5H20V16H13M21,4H3A2,2 0 0,0 1,6V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V6A2,2 0 0,0 21,4M21,19H12V6H21" /></svg>'
    readButton.setAttribute("type", "button");
    readButton.readTextElement = read;
    readButton.addEventListener("click", (e) => toggleRead(e, id));
    buttonContainer.appendChild(readButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", (e) => removeParent(e, id))
    buttonContainer.appendChild(deleteButton);

    newBook.appendChild(buttonContainer);

    container.appendChild(newBook);
}

function generateReadText(boolRead) {
    if (boolRead) {
        return "Read."
    }
    return "Not read."
}

function toggleRead(e, id) {
    var toggleIndex = myLibrary.findIndex(book => book.id == id);
    myLibrary[toggleIndex].isRead = !myLibrary[toggleIndex].isRead;

    var  newRead = myLibrary[toggleIndex].isRead;
    e.currentTarget.readTextElement.innerText = generateReadText(newRead);
}

function removeParent(e, id){
    let parent = e.target.parentElement.parentElement;
    parent.remove();

    var removeIndex = myLibrary.findIndex(book => book.id == id);
    myLibrary.splice(removeIndex, 1);
}


function main() {
    addBookToLibrary("Austin's Love Story", "Austin Senna", 123, false);
    addBookToLibrary("Javier's Coding Journey", "Javier Enrique Wong", 301, true);
    
    for (const book of myLibrary) {
        displayBook(book);
    }
}

main();

addButton.addEventListener("click", displayForm);

function displayForm(){
    let form = document.createElement("form");
    
}