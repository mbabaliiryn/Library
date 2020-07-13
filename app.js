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
  