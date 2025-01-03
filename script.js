const myLibrary = [
];

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
      const readStatus = this.read ? "already read" : "not read yet";
      return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  }
}
Book.prototype.toggleRead = function(){
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title,author,pages,read)
  myLibrary.push(newBook)
  displayBooks()
}


function displayBooks() {
  const bookGrid = document.getElementById('bookGrid');
  bookGrid.innerHTML = '';

  myLibrary.forEach((book, index) => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      bookCard.dataset.index = index;

      bookCard.innerHTML = `
          <h3>${book.title}</h3>
          <p>By: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Status: ${book.read ? 'Read' : 'Not read'}</p>
          <div class="book-actions">
              <button onclick="removeBook(${index})">Remove</button>
              <button onclick="toggleReadStatus(${index})">Toggle Read</button>
          </div>
      `;

      bookGrid.appendChild(bookCard);
  });
}
function removeBook(index){
  myLibrary.splice(index, 1);
  displayBooks();
}
function toggleReadStatus(index){
  myLibrary[index].toggleRead();
  displayBooks();
}
const newBookBtn = document.getElementById('newBookBtn');
const dialog = document.getElementById('bookDialog');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
  dialog.showModal();
})
console.log(newBookBtn)

cancelBtn.addEventListener('click', () => {
  dialog.close();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  dialog.close();
});
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);

