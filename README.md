# Library-Management-System
Code (Library Mangement System)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>📚 Simple Library Dashboard</h1>
    </header>

    <main>
        <section id="book-management">
            <h2>Book Management</h2>
            <form id="add-book-form">
                <input type="text" id="book-title" placeholder="Title" required>
                <input type="text" id="book-author" placeholder="Author" required>
                <input type="text" id="book-isbn" placeholder="ISBN" required>
                <button type="submit">Add Book</button>
            </form>
            <h3>Current Books</h3>
            <table id="book-list">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    </tbody>
            </table>
        </section>
        
        <hr>

        <section id="member-management">
            <h2>Member Management</h2>
            <form id="add-member-form">
                <input type="text" id="member-name" placeholder="Member Name" required>
                <input type="text" id="member-id" placeholder="Member ID" required>
                <button type="submit">Add Member</button>
            </form>
            <h3>Current Members</h3>
            <ul id="member-list">
                </ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Simple LMS Frontend</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>

body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f9;
    color: #333;
}

header {
    background-color: #4CAF50;
    color: white;
    padding: 20px;
    text-align: center;
}

main {
    padding: 20px;
    max-width: 1200px;
    margin: 20px auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

section {
    margin-bottom: 30px;
}

/* Forms */
#add-book-form, #add-member-form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input[type="text"] {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex-grow: 1;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

/* Tables and Lists */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #e9e9e9;
}

#member-list {
    list-style: none;
    padding: 0;
}

#member-list li {
    background: #f9f9f9;
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

footer {
    text-align: center;
    padding: 10px;
    background-color: #333;
    color: white;
    margin-top: 20px;
}

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
