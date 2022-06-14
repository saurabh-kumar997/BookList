class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//Ui constructor
class UI {
  constructor() {}
  //UI prototypes
  AddBook = function (book) {
    const tbody = document.getElementById("book-list");

    //create tr
    const row = document.createElement("tr");

    const col = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="closeBtn">X</a></td>    
      `;
    row.innerHTML = col;

    tbody.appendChild(row);
  };

  showMessage = function (message, className) {
    const errorDiv = document.createElement("div");

    const div = document.querySelector(".container");
    //   const heading = document.getElementById("heading");
    const form = document.getElementById("book-form");

    errorDiv.className = `alert ${className}`;
    errorDiv.appendChild(document.createTextNode(message));

    div.insertBefore(errorDiv, form);

    setTimeout(function () {
      errorDiv.remove();
    }, 3000);
  };

  clearfields = function () {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const isbn = document.getElementById("isbn");
    title.value = "";
    author.value = "";
    isbn.value = "";
  };
}

class Store {
  static getBooks() {
    let books =
      localStorage.getItem("bookList") === null
        ? []
        : JSON.parse(localStorage.getItem("bookList"));
    return books;
  }

  static addBook(book) {
    const books = this.getBooks();
    books.push(book);

    localStorage.setItem("bookList", JSON.stringify(books));
  }

  static displayBook() {
    let books = Store.getBooks();

    const ui = new UI();

    books.forEach(function (book) {
      ui.AddBook(book);
    });
  }

  static removeBook(target) {
    // console.log(target.parentElement.previousElementSibling.textContent);

    let isbn = target.parentElement.previousElementSibling.textContent;

    let books = this.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("bookList", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", Store.displayBook);

//UI variables
const submitBtn = document.getElementById("submitBtn");
const bookList = document.querySelector("#book-list");
const ui = new UI();

submitBtn.addEventListener("click", function (e) {
  //   console.log(title.value, author.value, isbn.value);
  e.preventDefault();
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const isbn = document.getElementById("isbn");

  const titleValue = title.value,
    authorValue = author.value,
    isbnValue = isbn.value;

  if (titleValue === "" || authorValue === "" || isbnValue === "") {
    ui.showMessage("Please fill all the details", "error");
  } else {
    const book = new Book(titleValue, authorValue, isbnValue);

    //UI add
    ui.AddBook(book);

    Store.addBook(book);

    ui.showMessage("Book added successfully!", "success");

    ui.clearfields();
  }
});

bookList.addEventListener("click", function (e) {
  e.preventDefault();

  let bookStore = JSON.parse(localStorage.getItem("bookList"));

  //   console.log("hjhj", e.target);
  let deleteElement = e.target;
  if (deleteElement.className === "closeBtn") {
    Store.removeBook(e.target);
    deleteElement.parentElement.parentElement.remove();
    ui.showMessage("Book deleted successfully!", "success");
  }
});
