let myLibrary = [{
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: "400",
    isRead: false,
}, {
    title: "Lost1",
    author: "Some guy",
    pages: "200",
    isRead: true
}, {
    title: "Lost2",
    author: "Some guy",
    pages: "200",
    isRead: true
}, {
    title: "Lost3",
    author: "Some guy",
    pages: "200",
    isRead: true
}, {
    title: "Lost4",
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
        ${book.isRead == true ? '<button class="read-button read">Read</button>' : '<button class="read-button unread">Unread</button>'}
        <button class="remove-button">Remove</button>
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
})

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

// Clicking read button
const isReadButtons = document.querySelectorAll(".read-button")

isReadButtons.forEach(isReadButton => {
    isReadButton.addEventListener("click", () => {
        if (isReadButton.textContent == "Read") {
            isReadButton.textContent = "Unread";
            isReadButton.classList = "read-button unread"
        } else if (isReadButton.textContent == "Unread") {
            isReadButton.textContent = "Read";
            isReadButton.classList = "read-button read"
        }  
    })

})

// Clicking remove button
const removeButtons = document.querySelectorAll(".remove-button");

removeButtons.forEach(removeButton => {
    removeButton.addEventListener("click", (e) => {
        removeButton.parentNode.remove();
        
    })
})