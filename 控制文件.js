/***********************
 * 图书馆管理系统 JS
 * 控制层 / 业务逻辑
 ***********************/

// ====== 模拟数据库 ======
const library = {
    books: [
        { id: "001", name: "三体", borrowed: false },
        { id: "002", name: "百年孤独", borrowed: false },
        { id: "003", name: "活着", borrowed: false }
    ],
    borrowedBooks: []
};

// ====== DOM ======
const statusEl = document.getElementById("status");
const inputEl = document.getElementById("book-input");
const borrowBtn = document.getElementById("borrow-btn");
const returnBtn = document.getElementById("return-btn");

// ====== 状态更新 ======
function updateStatus() {
    if (library.borrowedBooks.length === 0) {
        statusEl.innerText = "暂无借阅记录";
    } else {
        statusEl.innerText =
            "已借阅：" + library.borrowedBooks.join("、");
    }
}

// ====== 借书逻辑 ======
function borrowBook(bookName) {
    const book = library.books.find(b => b.name === bookName);

    if (!book) {
        alert("❌ 图书不存在");
        return;
    }

    if (book.borrowed) {
        alert("⚠ 该书已被借出");
        return;
    }

    book.borrowed = true;
    library.borrowedBooks.push(book.name);

    updateStatus();
    alert(`✅ 成功借阅：《${book.name}》`);
}

// ====== 还书逻辑 ======
function returnBook(bookName) {
    const book = library.books.find(b => b.name === bookName);

    if (!book) {
        alert("❌ 图书不存在");
        return;
    }

    if (!book.borrowed) {
        alert("⚠ 该书未被借出");
        return;
    }

    book.borrowed = false;
    library.borrowedBooks =
        library.borrowedBooks.filter(name => name !== book.name);

    updateStatus();
    alert(`📚 已归还：《${book.name}》`);
}

// ====== 右侧按钮绑定 ======
borrowBtn.onclick = () => {
    const name = inputEl.value.trim();
    if (!name) {
        alert("请输入书名");
        return;
    }
    borrowBook(name);
    inputEl.value = "";
};

returnBtn.onclick = () => {
    const name = inputEl.value.trim();
    if (!name) {
        alert("请输入书名");
        return;
    }
    returnBook(name);
    inputEl.value = "";
};

// ====== 初始化 ======
updateStatus();
