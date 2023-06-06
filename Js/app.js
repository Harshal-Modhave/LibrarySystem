// console.log("This is app.js");
// ToDo's --> add the record to localstorage and add a delete option for deleting the added books

// Using prototype

// Constructor
function Book(name, author, category) {
    this.name = name;
    this.author = author;
    this.category = category;
}

// Display constructor
function Display() {
}

// Add methods to display prototype
Display.prototype.addBook = function (book) {
    console.log("Adding to UI");
    let tableBody = document.getElementById('tableBody');
    let uiString = `
                    <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.category}</td>
                    </tr>
                   `;
    tableBody.innerHTML += uiString;
}
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}
Display.prototype.validateBook = function (book) {
    if (book.name != '' && book.author != '') {
        return true;
    }
    else {
        return false;
    }
}
Display.prototype.showMessage = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message!</strong> ${displayMessage}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

    setTimeout(function () {
        message.innerHTML = '';
    }, 3500);
}
// Add submit event listener to form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You have subbmitted the form");
    let name = document.getElementById('BookName').value;
    let author = document.getElementById('AuthorName').value;
    let category;

    let computerProgramming = document.getElementById('computerProgramming');
    let informationTechnology = document.getElementById('informationTechnology');
    let artificialIntelligence = document.getElementById('artificialIntelligence');

    if (computerProgramming.checked) {
        category = computerProgramming.value;
    }
    else if (informationTechnology.checked) {
        category = informationTechnology.value;
    }
    else if (artificialIntelligence.checked) {
        category = artificialIntelligence.value;
    }
    let book = new Book(name, author, category);
    console.log(book);

    // save the book to local storage
    // let addBook = document.getElementById('addBook');
    // addBook.addEventListener('click', function(book){
    //     let Books = localStorage.getItem('Books');
    //     if(Books == null){
    //         addedBooks = [];
    //     }
    //     else{
    //         addedBooks = JSON.parse(Books);
    //     }
    //     let myObj = {
    //         // Name: book.name,
    //         // Author: book.author,
    //         // Category: book.category
    //         Name: name,
    //         Author: author,
    //         Category: category
    //     }
    //     addedBooks.push(myObj);
    //     localStorage.setItem('Books', JSON.stringify(addedBooks));
    // });

    let display = new Display();

    if (display.validateBook(book)) {
        display.addBook(book);
        display.showMessage('success', 'You have successfully added the book');
        display.clear();
    }
    else {
        display.showMessage('danger', 'Sorry we are unable to add your book, Please add a validate book');
    }

    e.preventDefault(); // for no reloading of the page

}