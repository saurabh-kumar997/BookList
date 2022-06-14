function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//Ui constructor
function UI() {}

//UI prototypes
UI.prototype.AddBook = function (book) {
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

UI.prototype.showMessage = function (message, className) {
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

UI.prototype.clearfields = function () {
  title.value = "";
  author.value = "";
  isbn.value = "";
};

//UI variables
const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");
const submitBtn = document.getElementById("submitBtn");
const bookList = document.querySelector("#book-list");
const ui = new UI();

submitBtn.addEventListener("click", function (e) {
  //   console.log(title.value, author.value, isbn.value);
  e.preventDefault();

  const titleValue = title.value,
    authorValue = author.value,
    isbnValue = isbn.value;

  if (titleValue === "" || authorValue === "" || isbnValue === "") {
    ui.showMessage("Please fill all the details", "error");
  } else {
    const book = new Book(titleValue, authorValue, isbnValue);

    //UI add
    ui.AddBook(book);

    ui.showMessage("Book added successfully!", "success");

    ui.clearfields();
  }
});

bookList.addEventListener("click", function (e) {
  e.preventDefault();

  console.log("hjhj", e.target);
  let deleteElement = e.target;
  if (deleteElement.className === "closeBtn") {
    deleteElement.parentElement.parentElement.remove();
    ui.showMessage("Book deleted successfully!", "success");
  }
});
