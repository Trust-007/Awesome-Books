const booksSection = document.getElementById('book-list');
const form = document.getElementById('form');

class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  booksData = localStorage.getItem('books');

  retrievedBooks = JSON.parse(this.booksData);

  bookList = this.retrievedBooks || [];

  createBook() {
    if (this.bookList.length !== 0) {
      booksSection.replaceChildren();
      this.bookList.map((item) => {
        const book = document.createElement('div');
        book.className = 'book';
        const titleAuthor = document.createElement('p');
        titleAuthor.innerHTML = `"${item.title}" by ${item.author}`;
        book.appendChild(titleAuthor);
        const remove = document.createElement('button');
        remove.id = item.id;
        remove.onclick = (e) => {
          const itemId = e.target.id;

          const filteredBooks = this.bookList.filter((item) => {
            if (itemId !== item.id && this.bookList.length !== 1) {
              return item;
            }
            return '';
          });
          this.bookList = filteredBooks;
          localStorage.setItem('books', JSON.stringify(this.bookList));
          return this.createBook();
        };

        remove.innerHTML = 'Remove';
        book.appendChild(remove);
        return booksSection.appendChild(book);
      });
    } else {
      booksSection.replaceChildren();
      const message = document.createElement('h3');
      message.innerHTML = 'No Books available at the moment';
      booksSection.appendChild(message);
    }
  }

  submit() {
    const data = {
      title: this.title,
      author: this.author,
      id: this.id,
    };
    this.bookList.push(data);
    localStorage.setItem('books', JSON.stringify(this.bookList));
    this.createBook();
  }
}

const bookLists = new Books();
bookLists.createBook();

form.onsubmit = (event) => {
  event.preventDefault();
  const { title, author } = form.elements;
  const book = new Books(title.value, author.value, new Date().toString());
  book.submit();
  title.value = '';
  author.value = '';
};

// SPA code start
const logo = document.getElementById('logo');
const listLink = document.getElementById('list');
const addNewLink = document.getElementById('add-new');
const contactLink = document.getElementById('contact');
const booksPage = document.getElementById('books-section');
const formPage = document.getElementById('form-section');
const contactPage = document.getElementById('contact-section');

logo.addEventListener('click', () => {
  formPage.style.display = 'none';
  contactPage.style.display = 'none';
  booksPage.style.display = 'block';
  listLink.firstChild.style.color = 'cornflowerblue';
  addNewLink.firstChild.style.color = 'black';
  contactLink.firstChild.style.color = 'black';
});

listLink.addEventListener('click', () => {
  formPage.style.display = 'none';
  contactPage.style.display = 'none';
  booksPage.style.display = 'block';
  listLink.firstChild.style.color = 'cornflowerblue';
  addNewLink.firstChild.style.color = 'black';
  contactLink.firstChild.style.color = 'black';
});

addNewLink.addEventListener('click', () => {
  booksPage.style.display = 'none';
  contactPage.style.display = 'none';
  formPage.style.display = 'block';
  listLink.firstChild.style.color = 'black';
  addNewLink.firstChild.style.color = 'cornflowerblue';
  contactLink.firstChild.style.color = 'black';
});

contactLink.addEventListener('click', () => {
  formPage.style.display = 'none';
  booksPage.style.display = 'none';
  contactPage.style.display = 'block';
  listLink.firstChild.style.color = 'black';
  addNewLink.firstChild.style.color = 'black';
  contactLink.firstChild.style.color = 'cornflowerblue';
});

// adding functional date
const date = document.getElementById('date');

setInterval(() => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  const sec = new Date().getSeconds();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  let amPm;
  if (hour >= 12) {
    amPm = 'pm';
  } else {
    amPm = 'am';
  }
  date.innerHTML = `${monthNames[month]} ${day}th ${year}, ${hour}:${min}:${sec} ${amPm}`;
}, 1000);