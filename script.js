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

  displayBooks()

  formEl.reset()
}

function removeBook(index) {
  if (confirm('Are you sure you want to delete this book from the table?')) {
    myLibrary.splice(index, 1)
    displayBooks()
  }
}

function toggleReadStatus(index) {
  myLibrary[index].toggleRead()
  displayBooks()
}

function displayBooks() {
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
  myLibrary.forEach((book, index) => {
    let tr = document.createElement('TR')
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read ? 'Yes' : 'No'}</td>
    `
    let toggleBtn = document.createElement('button')
    toggleBtn.textContent = 'Toggle'
    toggleBtn.className = 'btn submitBtn'
    toggleBtn.onclick = function () {
      toggleReadStatus(index)
    }
    let removeBtn = document.createElement('button')
    removeBtn.textContent = 'Remove'
    removeBtn.className = 'deleteBtn'
    removeBtn.onclick = function () {
      removeBook(index)
    }
    let toggleTd = document.createElement('td')
    let removeTd = document.createElement('td')
    toggleTd.appendChild(toggleBtn)
    removeTd.appendChild(removeBtn)
    tr.appendChild(toggleTd)
    tr.appendChild(removeTd)

    tbody.appendChild(tr)
  })
  table.appendChild(tbody)

  myTableDiv.appendChild(table)
}
