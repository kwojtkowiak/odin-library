const myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.toggleRead = function () {
    this.read = !this.read
  }
}

function addBookToLibrary(event) {
  /* could also use return false as form onsubmit*/
  event.preventDefault()

  const formEl = document.forms.bookForm
  const bookInfoData = new FormData(formEl)
  const bookInfoObject = Object.fromEntries(bookInfoData)

  const isRead = bookInfoObject.read == 'on'
  const bookInfoObjectWithBoolean = { ...bookInfoObject, read: isRead }

  /*check to prevent adding empty rows*/
  if (!bookInfoObjectWithBoolean.book || !bookInfoObjectWithBoolean.author || !bookInfoObjectWithBoolean.pages) {
    alert('Please fill in all required fields.')
    return
  }

  const addedBook = new Book(
    bookInfoObjectWithBoolean.book,
    bookInfoObjectWithBoolean.author,
    bookInfoObjectWithBoolean.pages,
    bookInfoObjectWithBoolean.read
  )
  myLibrary.push(addedBook)

  displayBooks(myLibrary)

  formEl.reset()
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
    button.addEventListener('click', function () {
      if (confirm('Are you sure you want to delete this book from the table?')) {
        myLibrary.splice(index, 1)
        displayBooks(myLibrary)
      }
    })
    button.classList.add('submitBtn')
    button.style.marginRight = '0'

    let tdButton = document.createElement('TD')
    tdButton.appendChild(button)
    tdButton.style.textAlign = 'center'

    let changeStatusButton = document.createElement('BUTTON')
    changeStatusButton.textContent = 'Toggle read/unread'
    changeStatusButton.addEventListener('click', function () {
      book.toggleRead()
      displayBooks(myLibrary)
    })
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
