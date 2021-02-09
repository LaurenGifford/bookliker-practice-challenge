// document.addEventListener("DOMContentLoaded", function() {});

// DOM ELEMENTS/GLOBAL VARS
const fetchURL = 'http://localhost:3000/books'
const listPanel = document.querySelector('#list-panel')
const bookList = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
const currentUser = {"id":1, "username":"pouros"}
let bookLikers = []

// EVENT LISTENERS
window.addEventListener('load', getAllBooks)
document.body.addEventListener('click', clickHandler)

function clickHandler(e){
    switch (true) {
        case (e.target.className === "like-btn"):
            console.log("liked")
            submitLike(e)
            break
        case (e.target.className === "book-title"):
            getABook(e)
            break
    }
}

// FETCHERS
function getAllBooks(){
    fetch(fetchURL)
    .then(response => response.json())
    .then(booksData => booksData.forEach(book => displayBookList(book)))
}

function getABook(e){
    const selectedLiId = e.target.dataset.id
    
    fetch(`${fetchURL}/${selectedLiId}`)
    .then(response => response.json())
    .then(bookData => renderABook(bookData))
}

function submitLike(e){
        const book = e.target.closest('div')
        const bookId = book.dataset.id
        bookLikers.push(currentUser)

        fetch(`${fetchURL}/${bookId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({users: bookLikers})
        })
        .then(response =>response.json())
        .then(bookData => renderABook(bookData))
}


// LOGIC HANDLERS
function renderABook(book){
    showPanel.innerHTML = `<div class="book-holder" data-id="${book.id}">
    <img src="${book.img_url}" alt="photo of the book's cover">
    <h2 class="book-title">${book.title}</h2>
    <h3 class="book-subtitle">${book.subtitle}</h3>
    <h4 class="book-author">Written by: ${book.author}</h4>
    <br>
    <p class="book-description">${book.description}</p>
    <button class="like-btn" >Like</button>
    </div>
    `
    const usersList = document.createElement('ul')
    usersList.className = 'users-list'

    book.users.forEach(user => {
        const userLi = document.createElement('li')
        userLi.textContent = user.username
        usersList.append(userLi)
    })
    bookLikers = book.users
    showPanel.append(usersList)
}



function displayBookList(book){
    const bookLi = document.createElement('li')
    bookLi.className = 'book-title'
    bookLi.textContent = book.title
    bookLi.setAttribute("data-id", book.id)
    
    bookList.append(bookLi)
}