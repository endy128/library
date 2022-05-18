let myLibrary = [];

function Book(title, author, pages, beenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.beenRead = beenRead;
    this.info = function () {
        return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.beenRead}`);
    }
}


function addBookToLibrary() {
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var pages = document.getElementById('pages').value;
    var beenRead = document.getElementById('beenRead').value;
    const book = new Book (title, author, pages, beenRead);
    myLibrary.push(book);
    resetForm();
}

const book1 = new Book('Lord of the Flies', 'William', 234, false);
const book2 = new Book('Frankenstein', 'Mary Shelly', 456, false);
const book3 = new Book('Adventures of Tom Sawyer', 'Mark Twain', 658, 'true');
const book4 = new Book('Animal Farm', 'George Orwell', 784, true);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);

function displayLibrary() {
    myLibrary.forEach((book, index) => {
    // insert book div into html body
    //Create the element using the createElement method.
    var div = document.createElement("div");

    // let each element know it's place in the array for deletion later
    div.setAttribute("data-bookIndex", index);

    //Set class to book
    div.className = 'book';

    //Add your content to the DIV
    div.innerHTML = `   <h1>${book.title}</h1><br>
                        <p>${book.author}<br>
                            ${book.pages}<br>
                            ${book.beenRead}
                        </p>
                        <button onclick='deleteBook(${index}); clearContent("library"); displayLibrary();'>Delete</button>
                        `;
                            

    //Finally, append the element to the HTML body
    document.getElementById('library').appendChild(div);
})
}

function resetForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('beenRead').value = 'false';   
}


// function showForm() {
//     var element = document.getElementById('book-form');
//     element.style.visibility = "visible";
//     var button = document.getElementById('btn-show-form');
//     button.style.visibility = "hidden";
// }

function openForm() {
    document.getElementById("form-container").style.display = "grid";
    document.getElementById("form-popup").style.display = "block";
    // document.getElementById("form-container").backdrop-filter = "blur(10px)";

  }
  
function closeForm() {
    document.getElementById("form-container").style.display = "none";
    document.getElementById("form-popup").style.display = "none";

}

function deleteBook(index) {
    myLibrary.splice(index, 1);
}

function clearContent(elementId) {
    document.getElementById(elementId).innerHTML = "";
}

displayLibrary();