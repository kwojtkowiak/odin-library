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

function addBookToLibrary() {
  const bookName = document.querySelector('input[name=book]')
  myLibrary.push(bookName.value)
  bookName.value = ''
  console.log(myLibrary)
}

function displayBooks(books) {
  for (i = 1; i < books.length; i++) {
    
  }
}
