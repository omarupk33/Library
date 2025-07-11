// Basic Materials
const myLibrary = [];
const container = document.querySelector('.container')

function Book(author, title, pages){
    this.author = author
    this.title = title
    this.pages = pages
    this.id = crypto.randomUUID()
}

Book.prototype.readStatus = function(){
    console.log(`Author's name: ${this.author} Book's name: ${this.title} Number of pages: ${this.pages}`)
}


function addBookToLibrary(book){
if (!myLibrary.some(b => b.id === book.id)){
    myLibrary.push(book)
    }
}

// Creating a form
const form = document.createElement('form')
form.setAttribute('id', 'myForm')
let ls = ['author', 'title', 'pages']


const submit_btn = document.createElement('button') 
Object.assign(submit_btn, {
    type:'button',
    className: 'submit_btn',
    value: 'update',
    textContent: 'Submit'
})

function newForm(){
    for (text of ls){
        let label = document.createElement('label')
        let input = document.createElement('input')

        label.textContent = `${text}: `
        label.setAttribute('for', `${text}`)
        Object.assign(input, {
        id: `${text}`,
        type: 'name',
        required: true
        })    
        form.append(label)
        form.append(input)
    }

    submit_btn.setAttribute('form', 'myForm')

    form.append(submit_btn)
    container.append(form)
}

const add_form = document.getElementById('add_books')
add_form.addEventListener('click', () => {
    if(!container.contains(form)){ newForm()}
})


// Setting up / Adding to a table

const Table = document.getElementById("table") 

function remove_btn(){
    const remove_btn = document.createElement('button')
    remove_btn.textContent = 'Remove'
    remove_btn.style.color = 'red'
    return remove_btn 
}

function add_to_table(book_obj){
    addBookToLibrary(book_obj)
    const tr = document.createElement('tr')
    tr.style.background = 'lightgrey'
    tr.className = 'tr'

    let btn = remove_btn()
    btn.addEventListener('click', () => tr.remove()) 

    for (const key of Object.keys(book_obj)){
        const td = document.createElement('td')

        if (key === 'id'){
            tr.setAttribute('data-index-number', `${book_obj[key]}`)
        }
        else{
        td.textContent = `${book_obj[key]}`
        console.log(book_obj[key])
        tr.appendChild(td)
        }

        tr.appendChild(btn)
        Table.appendChild(tr)   
        }
    }

//  Submit Button
submit_btn.addEventListener('click', ()=> {
    const author_name = document.getElementById('author').value
    const book_title = document.getElementById('title').value
    const number_of_pages = document.getElementById('pages').value
    const new_book = new Book(author_name, book_title, number_of_pages)
    add_to_table(new_book)
    console.table(myLibrary)
    })


// Examples for the table
const golden_fish = new Book('Francisck', 'The golden fish', '300')
addBookToLibrary(golden_fish)

const Silver_bag = new Book('Georg Bush', 'The silver bag', '452')
addBookToLibrary(Silver_bag)

// Examples 
myLibrary.forEach(obs => {
    add_to_table(obs)
});
