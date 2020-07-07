
let BOOKS_LIST_CONTAINER;

const boorRowTeplate = function(book) {
    return `<div class="row">
        <div class="col s2">${book.num}</div>
        <div class="col s2">${book.title}</div>
        <div class="col s2">${book.author}</div>
        <div class="col s2">${book.year}</div>
        <div class="col s2">
        <!-- Switch -->
              <div class="switch">
                    <label><input type="checkbox" ${book.finished == true ? 'checked' : ''}><span class="lever"></span></label>
              </div>
        </div>
    </div>`;
};

init();

function init() {
    document.addEventListener("DOMContentLoaded", load());
}


function load() {
    BOOKS_LIST_CONTAINER =  document.getElementById("booksList");
    fetch("js/books.json")
        .then(response => response.json())
        .then(books => {

            books.forEach(book => {
                let row = document.createElement('div');
                row.innerHTML = boorRowTeplate(book);
                BOOKS_LIST_CONTAINER.appendChild(row);
            })
        });
}