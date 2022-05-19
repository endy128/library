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

// populate the array with some example book data
const book1 = new Book('Lord of the Flies', 'William', 234, false);
const book2 = new Book('Frankenstein', 'Mary Shelly', 456, false);
const book3 = new Book('Adventures of Tom Sawyer', 'Mark Twain', 658, true);
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

    // add the title to the div
    const h1 = document.createElement("h1");
    const title = document.createTextNode(book.title);
    h1.appendChild(title);
    div.appendChild(h1);

    // create the <p> and begin adding the author
    const p = document.createElement("p");
    const br = document.createElement("br");
    const author = document.createTextNode(`Author: ${book.author}`);
    p.appendChild(author);
    p.appendChild(br);
   
    // add the pages DOM nodes
    const pages = document.createTextNode(`Pages: ${book.pages}`);
    p.appendChild(pages);
    p.appendChild(br.cloneNode());

    const beenRead = document.createTextNode('Read?: ');
    p.appendChild(beenRead);
    

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("data-bookIndex", index);
    if (book.beenRead === true) {
        checkBox.checked = true;
    } else {
    checkBox.checked = false;
    }


    p.appendChild(checkBox);
    p.appendChild(br.cloneNode());

    const btnDelete = document.createElement("button");
    const buttonText = document.createTextNode("Delete");
    btnDelete.appendChild(buttonText);
    btnDelete.className = "btn-delete";
    btnDelete.setAttribute("data-bookIndex", index);
    p.appendChild(btnDelete); 

    div.appendChild(p);                   

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



function openForm() {
    document.getElementById("form-container").style.display = "grid";
    document.getElementById("form-popup").style.display = "block";

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
addButtonEventListeners();
addCheckboxListeners();


function addButtonEventListeners() {
    const buttons = Array.from(document.querySelectorAll('.btn-delete'));
    buttons.forEach(button => button.addEventListener("click", () => { 
        var index = button.getAttribute('data-bookIndex');
        deleteBook(index);
        // console.log(`Deleted Index: ${index}`);
        clearContent('library'); 
        displayLibrary();
        addButtonEventListeners();
        addCheckboxListeners();
    }));
}


function addCheckboxListeners() {
    const checkBoxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    checkBoxes.forEach(checkBox => checkBox.addEventListener('change', () => { 
    
        // get the index of the book in the library Array
        var index = checkBox.getAttribute('data-bookIndex');
        // console.log(`Index: ${index}`);
        // console.log(checkBox.checked);

        // if the check box changes (above) then change the corresponding object's attribute 
        if (checkBox.checked === true) {
            myLibrary[index].beenRead = true;
        } else {
            myLibrary[index].beenRead = false;
        }

    }));
}
