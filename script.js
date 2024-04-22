const myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

/*it could have also been a part of constructor function but it's the whole purpose of the exercise */
Book.prototype.toggleRead = function () {
  this.read = !this.read
}

function addBookToLibrary(event) {
  /* could also use return false as form onsubmit*/
  event.preventDefault()

  const formEl = document.forms.bookForm
  const formData = new FormData(formEl)
  const bookInfo = Object.fromEntries(formData)

  const isRead = bookInfo.read == 'on'

  /*check to prevent adding empty rows*/
  if (!bookInfo.book || !bookInfo.author || !bookInfo.pages) {
    alert('Please fill in all required fields.')
    return
  }
  const addedBook = new Book(bookInfo.book, bookInfo.author, bookInfo.pages, isRead)

  myLibrary.push(addedBook)

  displayBooks(myLibrary)

  formEl.reset()
}

function removeBook(index) {
  if (confirm('Are you sure you want to delete this book from the table?')) {
    myLibrary.splice(index, 1)
    displayBooks(myLibrary)
  }
}

function toggleReadStatus(index) {
  myLibrary[index].toggleRead()
  displayBooks()
}

function displayBooks(books) {
  let myTableDiv = document.getElementById('booksTableWrapper')
  myTableDiv.innerHTML = ''

  let table = document.createElement('TABLE')
  table.border = '1'

  let tableHeadings = ['No', 'Name', 'Author', 'Pages', 'Read?', '', 'Remove?']

  let thead = document.createElement('THEAD')
  let tr = document.createElement('TR')
  tableHeadings.forEach((heading) => {
    let th = document.createElement('TH')
    th.appendChild(document.createTextNode(heading))
    tr.appendChild(th)
  })
  thead.appendChild(tr)
  table.appendChild(thead)

  let tbody = document.createElement('TBODY')
  books.forEach((book, index) => {
    let tr = document.createElement('TR')
    let button = document.createElement('BUTTON')
    button.textContent = 'Remove book'
    button.addEventListener('click', () => removeBook(index))
    button.classList.add('submitBtn')
    button.style.marginRight = '0'

    let tdButton = document.createElement('TD')
    tdButton.appendChild(button)
    tdButton.style.textAlign = 'center'

    let changeStatusButton = document.createElement('BUTTON')
    changeStatusButton.textContent = 'Toggle read/unread'
    changeStatusButton.addEventListener('click', () => toggleReadStatus(index))
    changeStatusButton.classList.add('deleteBtn')

    let tdchangeStatusButton = document.createElement('TD')
    tdchangeStatusButton.appendChild(changeStatusButton)
    tdchangeStatusButton.style.textAlign = 'center'

    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(index + 1))
    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(book.title))
    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(book.author))
    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(book.pages))
    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(book.read ? 'Yes' : 'No'))
    tr.appendChild(tdchangeStatusButton)
    tr.appendChild(tdButton)
    tbody.appendChild(tr)
  })
  table.appendChild(tbody)

  myTableDiv.appendChild(table)
}

displayBooks(myLibrary)
