function findAccountById(accounts, id) {
  for (const account in accounts){
    if (accounts[account].id === id){
      return accounts[account];
    }
  }
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) =>
    account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let accumulator = 0;
  for (const book in books) {
    for (const borrower in books[book].borrows) {
      if (books[book].borrows[borrower].id === account.id) accumulator++;
    }
  }
  return accumulator;
}

function retrieveAuthorObjectById(authorId, authors) {
  const author = authors.find((element) => authorId === element.id);
  return author;
}

function getBooksPossessedByAccount({id}, books, authors) {
  let booksPossessed = [];
  for (const index in books) {
    const book = books[index];
    const borrows = book.borrows[0];
    if (!borrows.returned && borrows.id === id){
      const authorId = book.authorId;
      const authorObject = retrieveAuthorObjectById(authorId, authors);
      book.author = authorObject;
      booksPossessed.push(book);
    }
  }
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

