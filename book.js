let myLibraryDefault = [{
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

//Local storage check
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

// Testing for local storage is populated
if (storageAvailable("localStorage")) {
    if (!localStorage.getItem("myLibrary")) {
        localStorage.setItem("myLibrary", JSON.stringify(myLibraryDefault))
    }
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
} else {
    alert("Local storage is not available, please enable")
}

displayBooks(myLibrary);

//// All functions 

// Book Constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${isRead==true ? "read" : "not read yet"}`
    }
}

// Library Constructor
function Library(array) {
    this.bookCollection = array;

    this.numOfBooks = function () {

    }
} 

function addBookToLibrary(userBook) {
    myLibrary.push(userBook);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
}
    
function displayBooks (Library) {
    document.getElementById("book-container").innerHTML = "";
    
    // Card for each book
    Library.forEach(book => {
        bookContainer = document.getElementById("book-container")
        div = document.createElement("div")
        div.classList = "card"
        div.id = book.title

        div.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        ${book.isRead == true ? '<button class="read-button read">Read</button>' : '<button class="read-button unread">Unread</button>'}
        <button class="remove-button">Remove</button>
        `;
        bookContainer.appendChild(div)
    })
    
    updateStats(Library);
}


// FORM FUNCTIONS 

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

// Submitting form adds new card
// const submitButton = document.getElementById("submit-button");
// submitButton.addEventListener("click")

const form = document.getElementById("new-book-form");

form.onsubmit = () => {
    let titleInput = document.getElementById("title-input").value;
    let authorInput = document.getElementById("author-input").value;
    let pageInput = document.getElementById("pages-input").value;
    let readInput = document.getElementById("read-input").checked;

    console.log(readInput)
    newBook = new Book(titleInput, authorInput, pageInput, readInput);
    addBookToLibrary(newBook);
}

// CARD FUNCTIONS

// Clicking read button
const isReadButtons = document.querySelectorAll(".read-button")

isReadButtons.forEach(isReadButton => {
    isReadButton.addEventListener("click", () => {
        if (isReadButton.textContent == "Read") {
            isReadButton.textContent = "Unread";
            isReadButton.classList = "read-button unread"
            book = isReadButton.parentNode.id 
            index = myLibrary.findIndex(x => x.title==book)
            myLibrary[index].isRead = false
            updateLibrary(myLibrary)

        } else if (isReadButton.textContent == "Unread") {
            isReadButton.textContent = "Read";
            isReadButton.classList = "read-button read"
            book = isReadButton.parentNode.id 
            index = myLibrary.findIndex(x => x.title==book)
            myLibrary[index].isRead = true
            updateLibrary(myLibrary)
        }  
    })

})

// Clicking remove button
const removeButtons = document.querySelectorAll(".remove-button");

removeButtons.forEach(removeButton => {
    removeButton.addEventListener("click", (e) => {
        book = removeButton.parentNode.id
        index = myLibrary.findIndex(x => x.title==book)
        myLibrary.splice(index, 1)
        updateLibrary(myLibrary)
        document.location.reload(true)
    })
})

// Clear library
const resetLibraryButton = document.getElementById("reset-library")

resetLibraryButton.addEventListener("click", () => {
    localStorage.removeItem("myLibrary")
    localStorage.setItem("myLibrary", JSON.stringify(myLibraryDefault))
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    document.location.reload(true)
})

// Update storage
function updateLibrary(myLibrary){
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
    updateStats(myLibrary);
}

function updateStats(Library) {
    // Library stats
    booksRead = Library.filter(book => book.isRead === true);
    let pagesRead = 0;
    for (let i=0; i<booksRead.length; i++) {
        pagesRead += parseInt(booksRead[i].pages)
    }
    statusContainer = document.getElementById("stats-container");
    div = document.createElement("div");
    div.classList = "stats";

    totalBooksDiv = document.getElementById("total-books")
    booksReadDiv = document.getElementById("books-read")
    pagesReadDiv = document.getElementById("pages-read")

    totalBooksDiv.textContent = `Total books: ${Library.length}`
    booksReadDiv.textContent = `Books read: ${booksRead.length}`
    pagesReadDiv.textContent = `Pages read: ${pagesRead}`

    statusContainer.appendChild(div)
}