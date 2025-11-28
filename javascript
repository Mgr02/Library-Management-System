// --- Data Storage (In-Memory) ---
let books = [];
let members = [];

// --- Book Management Functions ---

const addBook = (title, author, isbn) => {
    // Basic validation
    if (!title || !author || !isbn) return;

    const newBook = { id: Date.now(), title, author, isbn };
    books.push(newBook);
    renderBooks();
};

const deleteBook = (bookId) => {
    books = books.filter(book => book.id !== bookId);
    renderBooks();
};

const renderBooks = () => {
    const bookListBody = document.querySelector('#book-list tbody');
    bookListBody.innerHTML = ''; // Clear existing rows

    books.forEach(book => {
        const row = bookListBody.insertRow();
        
        row.insertCell().textContent = book.title;
        row.insertCell().textContent = book.author;
        row.insertCell().textContent = book.isbn;
        
        const actionCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor = 'crimson';
        deleteButton.onclick = () => deleteBook(book.id);
        actionCell.appendChild(deleteButton);
    });
};

// --- Member Management Functions ---

const addMember = (name, id) => {
    if (!name || !id) return;

    const newMember = { name, id };
    members.push(newMember);
    renderMembers();
};

const deleteMember = (memberId) => {
    members = members.filter(member => member.id !== memberId);
    renderMembers();
};

const renderMembers = () => {
    const memberListUl = document.getElementById('member-list');
    memberListUl.innerHTML = ''; // Clear existing items

    members.forEach(member => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>Name: **${member.name}** | ID: ${member.id}</span>
            <button style="background-color: crimson;" onclick="deleteMember('${member.id}')">Remove</button>
        `;
        memberListUl.appendChild(listItem);
    });
};


// --- Event Listeners ---

document.getElementById('add-book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const isbn = document.getElementById('book-isbn').value;

    addBook(title, author, isbn);

    // Clear form
    document.getElementById('add-book-form').reset();
});

document.getElementById('add-member-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('member-name').value;
    const id = document.getElementById('member-id').value;

    addMember(name, id);

    // Clear form
    document.getElementById('add-member-form').reset();
});

// Initial render for demonstration
addBook('The Hitchhikers Guide to the Galaxy', 'Douglas Adams', '978-0345391803');
addBook('To Kill a Mockingbird', 'Harper Lee', '978-0061120084');
addMember('Alice Johnson', 'M001');
addMember('Bob Smith', 'M002');
