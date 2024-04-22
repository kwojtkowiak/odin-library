const myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`
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

  let tableHeadings = ['No', 'Name', 'Author', 'Pages', 'Read?']

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
    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(index + 1))
    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(book.title))
    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(book.author))
    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(book.pages))
    tr.appendChild(document.createElement('TD')).appendChild(document.createTextNode(book.read ? 'Yes' : 'No'))
    tbody.appendChild(tr)
  })
  table.appendChild(tbody)

  myTableDiv.appendChild(table)
}

displayBooks(myLibrary)
