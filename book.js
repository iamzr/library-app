let myLibrary = [{
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: "400",
    isRead: false,
}, {
    title: "Lost",
    author: "Some guy",
    pages: "200",
    isRead: true
}, {
    title: "Lost",
    author: "Some guy",
    pages: "200",
    isRead: true
}, {
    title: "Lost",
    author: "Some guy",
    pages: "200",
    isRead: true
}, {
    title: "Lost",
    author: "Some guy",
    pages: "200",
    isRead: true
}];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${isRead==true ? "read" : "not read yet"}`
    }
}

function addBookToLibrary(userBook) {
    myLibrary.push(userBook)
}

function displayBooks (Library) {
    Library.forEach(book => {
        bookContainer = document.getElementById("book-container")
        p = document.createElement("p")
        div = document.createElement("div")
        div.classList = "card"

        div.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <button class="read-button">${book.isRead == true ? "Read" : "Unread"}</button>
        `;
        bookContainer.appendChild(div)
    })
}

displayBooks(myLibrary);

// New book form javascript
const newBookButton = document.getElementById("new-book-button");
const formContainer = document.getElementById("new-book-form-container");
const closeButton = document.getElementById("close-button")

// New book button opens form
newBookButton.addEventListener("click", () => {
    formContainer.style.display = "block";
}
)

// Close buttons closes form
closeButton.addEventListener("click", () => {
    formContainer.style.display = "none";
})

// Clicking outside the form closes it
window.addEventListener("click", (e) => {
    if (e.target == formContainer) {
        formContainer.style.display = "none";
    }
})