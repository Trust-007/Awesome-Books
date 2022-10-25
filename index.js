const booksSection = document.getElementById('book-list');
const form = document.getElementById('form');

const booksData = localStorage.getItem('books');
const retrievedBooks = JSON.parse(booksData);
let bookLists = retrievedBooks || [];

const getBookLists = () => {
  if (bookLists.length !== 0) {
    booksSection.replaceChildren();
    bookLists.map((item) => {
      const book = document.createElement('div');
      const title = document.createElement('p');
      title.innerHTML = item.title;
      book.appendChild(title);
      const author = document.createElement('p');
      author.innerHTML = item.author;
      book.appendChild(author);
      const remove = document.createElement('button');
      remove.id = item.id;
      remove.innerHTML = 'Remove';
      book.appendChild(remove);
      const line = document.createElement('hr');
      book.appendChild(line);
      return booksSection.appendChild(book);
    });
  } else {
    booksSection.replaceChildren();
    const message = document.createElement('h3');
    message.innerHTML = 'No Books available at the moment';
    booksSection.appendChild(message);
  }
};

getBookLists();

form.onsubmit = (event) => {
  event.preventDefault();
  const { title, author } = form.elements;
  const book = {
    id: new Date().toString(),
    title: title.value,
    author: author.value,
  };
  bookLists.push(book);
  localStorage.setItem('books', JSON.stringify(bookLists));
  title.value = '';
  author.value = '';
  getBookLists();
};