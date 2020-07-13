const addFormBox = document.getElementById('form-box');
const addBookBtn = document.getElementById('add-button');
const closeBtn = document.getElementsByClassName('close')[0];
const addForm = document.forms['add-form'];
const bookList = document.querySelector('#list ul');

addBookBtn.onclick = () => { addFormBox.style.display = 'block'; };
closeBtn.onclick = () => { addFormBox.style.display = 'none'; };

function Book(id, author, title, pages, read = false) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

// eslint-disable-next-line prefer-const
let iconHTML = {
  read: '<i class="fi-cnsuxl-check" style="color: green;"></i>',
  unread: '<i class="fi-cnluxl-check"></i>',
  delete: '<i class="fi-xnluxl-trash-bin"></i>',
};

const renderBook = (book) => {
  const li = document.createElement('li');
  const title = document.createElement('span');
  title.textContent = book.title;
  title.classList.add('book-title');
  const author = document.createElement('span');
  author.textContent = `by ${book.author}`;
  author.classList.add('book-author');
  const pages = document.createElement('span');
  pages.textContent = `${book.pages} Pages`;
  pages.classList.add('book-pages');
  const details = document.createElement('div');
  details.classList.add('book-details');
  details.appendChild(title);
  details.appendChild(author);
  details.appendChild(pages);
  li.appendChild(details);
  const bookRead = document.createElement('span');
  bookRead.innerHTML = iconHTML.read;
  bookRead.classList.add('book-read', 'icon');
  const bookUnread = document.createElement('span');
  bookUnread.innerHTML = iconHTML.unread;
  bookUnread.classList.add('book-unread', 'icon');
  if (book.read) {
    bookUnread.style.display = 'none';
  } else {
    bookRead.style.display = 'none';
  }
  const del = document.createElement('span');
  del.innerHTML = iconHTML.delete;
  del.classList.add('book-delete', 'icon');
  const edit = document.createElement('div');
  edit.classList.add('book-edit');
  edit.appendChild(bookRead);
  edit.appendChild(bookUnread);
  edit.appendChild(del);
  li.appendChild(edit);
  const id = document.createElement('span');
  id.textContent = Number(book.id).toString();
  id.style.display = 'none';
  id.classList.add('book-id');
  li.appendChild(id);
  bookList.appendChild(li);
};

function render() {
  const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
  myLibrary.forEach((book) => { renderBook(book); });
}

function addBookToLibrary() {
  const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const len = myLibrary.length;
  const id = (len === 0) ? 0 : myLibrary[len - 1].id + 1;
  const title = addForm.querySelector('#title-input').value;
  const author = addForm.querySelector('#author-input').value;
  const pages = addForm.querySelector('#pages-input').value;
  const read = Boolean(Number(addForm.querySelector("input[name='read']:checked").value));
  const book = new Book(id, author, title, pages, read);
  myLibrary.push(book);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  renderBook(book);
}

// eslint-disable-next-line no-unused-vars
addForm.addEventListener('submit', (event) => { addBookToLibrary(); });

bookList.addEventListener('click', event => {
  const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const icon = event.target.closest('.icon');
  if (icon !== null) {
    const li = icon.closest('li');
    const bookId = Number(li.querySelector('.book-id').textContent);
    const index = myLibrary.findIndex((book) => book.id === bookId);
    if (icon.classList.contains('book-delete')) {
      bookList.removeChild(li);
      myLibrary.splice(index, 1);
    } else if (icon.classList.contains('book-read')) {
      const bookUnread = li.querySelector('.book-unread');
      bookUnread.style.display = 'inline';
      icon.style.display = 'none';
      myLibrary[index].read = false;
    } else if (icon.classList.contains('book-unread')) {
      const bookRead = li.querySelector('.book-read');
      bookRead.style.display = 'inline';
      icon.style.display = 'none';
      myLibrary[index].read = true;
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }
});

render();