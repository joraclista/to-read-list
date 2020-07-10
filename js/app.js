
let booksListContainer;
let finishedBooksListContainer;

let addBookTitle;
let addBookAuthor;
let addBookDateFinished;
let addBookBtn;
let validationMessage;

const bookRowTeplate = function(book) {
    return `<div class="row">
        <!-- Switch -->
        <div class="col s1 switchCol">
            <label>
                <input type="checkbox" class="filled-in switcher" ${book.finished == true ? 'checked' : ''} />
                <span></span>
             </label>
        </div>
        <div class="col s5">${format(book.title)}</div>
        <div class="col s3">${format(book.author)}</div>  
        <div class="col s3">${format(book.dateFinished)}</div>
    </div>`;
};

const VALIDATION_MESSAGES = {
    invalidTitle : "Title should be not empty and at least 3 letters long",
    invalidAuthor : "Author should be not empty and at least 3 letters long"
};

init();

function format(value) {
    return typeof value == 'undefined' || value == null ? '' : value;
}

function init() {
    document.addEventListener("DOMContentLoaded", load());
}


function onBookRowClick(e) {
    console.log(`onBookRowClick: e.target `, e.target);
    let el =  e.target;
    if (el.classList.contains("switcher")) {
        let row = el.parentElement.parentElement.parentElement;
        console.log('k', row.children[3])
        row.children[3].innerHTML = new Date().toLocaleDateString();
        finishedBooksListContainer.insertBefore(row, finishedBooksListContainer.children[0]);
        //TODO update model
    }

}

function onAddBookClick() {

    let newBook = {
        title : addBookTitle.value,
        author : addBookAuthor.value,
        dateFinished : addBookDateFinished.value,
        finished : false
    };

    console.log("onAddBookClick: newBook", newBook);

    // Check validation
    if (typeof newBook.title == 'undefined' || newBook.title == null || newBook.title.trim().length < 3) {
        validationMessage.innerHTML = VALIDATION_MESSAGES.invalidTitle;
        return
    } else if (typeof newBook.author == 'undefined' || newBook.author == null || newBook.author.trim().length < 3) {
        validationMessage.innerHTML = VALIDATION_MESSAGES.invalidAuthor;
        return
    }

    let row = document.createElement('div');
    row.innerHTML = bookRowTeplate(newBook);

    booksListContainer.insertBefore(row, booksListContainer.children[0]);

    addBookTitle.value = '';
    addBookAuthor.value = '';
    addBookDateFinished.value = '';
    validationMessage.innerHTML = '';
    //TODO add to model
}

function load() {
    booksListContainer =  document.getElementById("booksList");
    finishedBooksListContainer = document.getElementById("finishedBooksList");
    addBookTitle = document.getElementById("addBookTitle");
    addBookAuthor = document.getElementById("addBookAuthor");
    addBookDateFinished = document.getElementById("addBookDateFinished");
    addBookBtn = document.getElementById("addBook");
    validationMessage = document.getElementById("validationMessage");

    booksListContainer.addEventListener("click", onBookRowClick);
    document.getElementById("addBook").addEventListener("click", onAddBookClick);

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.datepicker');
        var currYear = (new Date()).getFullYear();
        var instances = M.Datepicker.init(elems, {
            defaultDate: Date.now(),
            setDefaultDate: Date.now(),
            yearRange: [currYear - 5, currYear + 1],
            format: "dd-mm-yyyy"
        });
    });

    fetch("js/books.json")
        .then(response => response.json())
        .then(books => {

            books.forEach(book => {

                let row = document.createElement('div');
                row.innerHTML = bookRowTeplate(book);
                if (book.finished) {
                    finishedBooksListContainer.appendChild(row);
                } else {
                    booksListContainer.appendChild(row);
                }

            })
        });
}