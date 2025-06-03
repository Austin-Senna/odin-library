
const myLibrary = [];
let container = document.querySelector(".container");
let addButton = document.querySelector("#add-button")

function Book(title, author, pages, id) {
    if (!new.target) {
        throw Error("Make it a new target.")
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
}

function addBookToLibrary(title, author, pages) {
    let newBook = new Book(title, author, pages, crypto.randomUUID());
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
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.setAttribute('type', 'button');
    deleteButton.addEventListener("click", removeParent)
    newBook.appendChild(deleteButton);

    container.appendChild(newBook);
}

function removeParent(e){
    let parent = e.target.parentElement;
    parent.remove();
}

function main() {
    addBookToLibrary("Austin's Love Story", "Austin Senna", 123);
    addBookToLibrary("Javier's Coding Journey", "Javier Enrique Wong", 301);
    
    for (const book of myLibrary) {
        displayBook(book);
    }
}

main();
addButton.addEventListener("click", displayForm);
