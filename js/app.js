
let BOOKS_LIST_CONTAINER;

const bookRowTeplate = function(book) {
    return `<div class="row">
        <!-- Switch -->
        <div class="col s1 switchCol">
            <label>
                <input type="checkbox" class="filled-in switcher" ${book.finished == true ? 'checked' : ''} />
                <span></span>
             </label>
        </div>
        <div class="col s1">${format(book.num)}</div>
        <div class="col s5">${format(book.title)}</div>
        <div class="col s3">${format(book.author)}</div>  
        <div class="col s2">${format(book.dateFinished)}</div>
    </div>`;
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
        console.log('k', el.parentElement.parentElement.parentElement.children[4])
        el.parentElement.parentElement.parentElement.children[4].innerHTML = new Date().toLocaleDateString();
        //TODO update model
    }

}

function load() {
    BOOKS_LIST_CONTAINER =  document.getElementById("booksList");
    BOOKS_LIST_CONTAINER.addEventListener("click", onBookRowClick);

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
                BOOKS_LIST_CONTAINER.appendChild(row);
            })
        });
}