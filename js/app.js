let $ = document;

const addBookBtn = $.querySelector(".add-btn");

const titleElem = $.querySelector("#title");
const authorElem = $.querySelector("#author");
const yearElem = $.querySelector("#year");
const bookListContainer = $.querySelector("#book-list");

let books = [];

addBookBtn.addEventListener("click", function (event) {
  let titileInputElem = titleElem.value;
  let authorInputElem = authorElem.value;
  let yearInputElem = yearElem.value;

  if (
    titileInputElem === "" ||
    authorInputElem === "" ||
    yearInputElem === ""
  ) {
    alert("لطفا همه ی گزینه هارو کامل کنید");
  } else {
    let newBookObject = {
      id: books.length + 1,
      title: titileInputElem,
      author: authorInputElem,
      year: yearInputElem,
    };
    books.push(newBookObject);
    event.preventDefault();
    setIntoLocalStorage(books);
  }
  books.push(newBookObject);
});

function setIntoLocalStorage(allBooksArray) {
  localStorage.setItem("books", JSON.stringify(allBooksArray));
  makeEmptyInputElem();
  booksGenrator(allBooksArray);
}

function makeEmptyInputElem() {
  titleElem.value = "";
  authorElem.value = "";
  yearElem.value = "";
}

function booksGenrator(allBooksArray) {
  bookListContainer.innerHTML = "";

  allBooksArray.forEach(function (book) {
    newBookTrElem = $.createElement("tr");

    let newBookTitleTh = $.createElement("th");
    newBookTitleTh.innerHTML = book.title;

    let newBookAuthorTh = $.createElement("th");
    newBookAuthorTh.innerHTML = book.author;

    let newBookYearTh = $.createElement("th");
    newBookYearTh.innerHTML = book.year;

    newBookTrElem.append(newBookTitleTh, newBookAuthorTh, newBookYearTh);

    bookListContainer.append(newBookTrElem);
  });
}

function getBooksFromLocalStorage() {
  let localStorageBooks = localStorage.getItem("books");

  if (localStorageBooks) {
    books = JSON.parse(localStorageBooks);
    booksGenrator(books);
  }
}
window.addEventListener("load", getBooksFromLocalStorage);
