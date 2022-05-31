let myLibrary = [
    // { title: 'Lord of the Flies', author: 'William Golding', pages: 224, beenRead: false},
    // { title: 'Frankenstein', author: 'Mary Shelly', pages: 280, beenRead: false},
    // { title: 'Adventures of Tom Sawyer', author: 'Mark Twain', pages: 368, beenRead: true},
    // { title: 'Animal Farm', author: 'George Orwell', pages: 112, beenRead: true}
];



class Book {
    constructor(title, author, pages, beenRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.beenRead = beenRead;
    }
    info() {
        return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.beenRead}`);
    }
    
    toggleRead() {
        if (this.beenRead === true) {
            this.beenRead = false;
        } else {
            this.beenRead = true;
        }
    }
}

// populate the array with some example book data
// use push() so the objects receive the functions from the prototype
const book1 = new Book('Lord of the Flies', 'William Golding', 224, false);
const book2 = new Book('Frankenstein', 'Mary Shelly', 280, false);
const book3 = new Book('Adventures of Tom Sawyer', 'Mark Twain', 368, true);
const book4 = new Book('Animal Farm', 'George Orwell', 112, true);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);


function addBookToLibrary() {
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var pages = document.getElementById('pages').value;
    var beenRead = document.getElementById('beenRead').value;
    // set to boolean from string input
    if (beenRead == 'true') {
        beenRead = true;
    } else {
        beenRead = false;
    }
    const book = new Book (title, author, pages, beenRead);
    myLibrary.push(book);
    resetForm();
}


function displayLibrary() {
    myLibrary.forEach((book, index) => {
    // insert book div into html body
    //Create the element using the createElement method.
    var div = document.createElement('div');

    // let each element know it's place in the array for deletion later
    div.setAttribute('data-bookIndex', index);

    //Set class to book
    div.className = 'book';

    // add the title to the div
    const h1 = document.createElement('h1');
    const title = document.createTextNode(book.title);
    h1.appendChild(title);
    div.appendChild(h1);

    // create the <table> and begin adding the fields
    const table = document.createElement('table');
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    const author = document.createTextNode('Author: ');
    const authorValue = document.createTextNode(book.author);
    cell1.appendChild(author);
    cell2.appendChild(authorValue);

    row = table.insertRow(1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    const pages = document.createTextNode('Pages: ');
    const pagesValue = document.createTextNode(book.pages);
    cell1.appendChild(pages);
    cell2.appendChild(pagesValue);
    
 
    row = table.insertRow(2);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    const beenRead = document.createTextNode('Read?: ');
    // const pagesValue = document.createTextNode(book.pages);
    cell1.appendChild(beenRead);

    // create a check box, set it according to the book's attribute
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('data-bookIndex', index);
    if (book.beenRead === true) {
        checkBox.checked = true;
    } else {
    checkBox.checked = false;
    }
    cell2.appendChild(checkBox);

    // add the completed table to the div
    div.appendChild(table);    
    
    // create the delete button outside of the table
    const btnDelete = document.createElement('button');
    const buttonImage = document.createElement('img');
    buttonImage.src = 'assets/trash-can-outline.svg';
    btnDelete.appendChild(buttonImage);
    btnDelete.className = 'btn-delete';
    btnDelete.setAttribute('data-bookIndex', index);
    // adds a nice tool tip when the ouse hovers over the button
    btnDelete.setAttribute('title', 'Delete book');
    div.appendChild(btnDelete); 

    //Finally, append the element to the HTML body
    document.getElementById('library').appendChild(div);
})
}

function resetForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('beenRead').value = false;   
}



function openForm() {
    document.getElementById('form-container').style.display = 'grid';
    document.getElementById('form-popup').style.display = 'block';

  }
  
function closeForm() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('form-popup').style.display = 'none';

}

function deleteBook(index) {
    myLibrary.splice(index, 1);
}

function clearContent(elementId) {
    document.getElementById(elementId).innerHTML = '';
}



displayLibrary();
addButtonEventListeners();
// addCheckboxListeners();
addSubmitButtonEventListener();


function addButtonEventListeners() {
    const buttons = Array.from(document.querySelectorAll('.btn-delete'));
    buttons.forEach(button => button.addEventListener('click', () => { 
        var index = button.getAttribute('data-bookIndex');
        deleteBook(index);
        // console.log(`Deleted Index: ${index}`);
        clearContent('library'); 
        displayLibrary();
        addButtonEventListeners();
        // addCheckboxListeners();
    }));

    const showFormButton = document.getElementById('btn-show-form');
    showFormButton.addEventListener('click', () => { 
       openForm();
    });

    const closeFormButton = document.getElementById('btn-cancel');
    closeFormButton.addEventListener('click', () => { 
      closeForm();
    });


    const checkBoxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    checkBoxes.forEach(checkBox => checkBox.addEventListener('change', () => { 
        // get the index of the book in the library Array
        var index = checkBox.getAttribute('data-bookindex');

        // if the check box is changed, toggle it's value
        myLibrary[index].toggleRead(); 

    }));
}



function addSubmitButtonEventListener() {
    const button = document.getElementById('btn-submit');
     button.addEventListener('click', () => { 
        addBookToLibrary(); 
        closeForm(); 
        clearContent('library'); 
        displayLibrary();
        addButtonEventListeners();
    });
}

