
const myLibrary = [];
let container = document.querySelector(".container");
let addButton = document.querySelector("#add-button")
let body = document.querySelector("body");

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

    var newRead = myLibrary[toggleIndex].isRead;
    e.currentTarget.readTextElement.innerText = generateReadText(newRead);
}

function removeParent(e, id){
    let parent = e.target.parentElement.parentElement;
    parent.remove();

    var removeIndex = myLibrary.findIndex(book => book.id == id);
    myLibrary.splice(removeIndex, 1);
}


function main() {
    addBookToLibrary("Austin's Storyline", "Austin Senna", 123, false);
    addBookToLibrary("Javier's Coding Journey", "Javier Enrique Wong", 301, true);
    addBookToLibrary("Javascript Cranks", "Billy Asher", 542, false);

    for (const book of myLibrary) {
        displayBook(book);
    }
}

main();

addButton.addEventListener("click", displayForm);

function displayForm(){
    let dialog = document.createElement("dialog");

    let form = document.createElement("form");

    let title = document.createElement("h2");
    title.innerText = "Add Book";

    let mainContent = document.createElement("div");
    mainContent.classList.add("form-main");
    let bookTitle = createLine("title", "Title");
    let bookAuthor = createLine("author", "Author");
    let bookPages = createLine("pages", "Pages");
    mainContent.appendChild(bookTitle);
    mainContent.appendChild(bookAuthor);
    mainContent.appendChild(bookPages);

    let submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.addEventListener("click", () => 
    {
        let newBook = new Book ()
    });

    form.appendChild(title);
    form.appendChild(mainContent);
    form.appendChild(submitButton);

    dialog.appendChild(form);

    container.appendChild(dialog);
}

/* input: string */
function createLine(inputType, inputString) {
    let container = document.createElement("div");
    container.classList.add("containerLine");

    let label = document.createElement("label");
    label.setAttribute("for", inputType);
    label.innerText = inputString;

    let input = document.createElement("input");
    input.setAttribute("required", "");
    input.setAttribute("type", "text");
    input.setAttribute("id", inputType);
    input.setAttribute("name", inputType);

    container.appendChild(label);
    container.appendChild(input);

    return container;
}