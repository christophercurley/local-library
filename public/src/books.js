function findAuthorById(authors, id) {
  const author = authors.reduce((result, authorInfo) => {
    if (authorInfo.id === id) {
      result = authorInfo;
      return result;
    } else return result;
  }, {})  
  return author;  
}            

function findBookById(books, id) {
  const bookById = books.reduce((result, bookInfo) => {
    if (bookInfo.id === id){
      return result = bookInfo;    
    } else return result;
  }, {})
  return bookById;
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = books.filter((book) => (!book.borrows[0].returned));
  const returnedBooks = books.filter((book) => (book.borrows[0].returned));  
  byBorrowedStatus = [checkedOutBooks, returnedBooks];
  return byBorrowedStatus;
}

function getBorrowersForBookv2(book, accounts) {
  const accountsOnReturnedList = accounts.reduce((result, account, index) => {
    console.log(result.length);
    if (result.length < 10) {
      return book.borrows.some((entry) => {
        return entry.id === account.id
      });
      return result;
    } else return result;
  }, []);
  return accountsOnReturnedList;
}

function getBorrowersForBook(book, accounts) {
  const result = [];
  //loop through all accounts
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    if (result.length >= 10) {
      return result;
    } 
    for (let j =0; j < book.borrows.length; j++){
      const borrowed = book.borrows[j];
      if (account.id === borrowed.id) {
        account.returned = borrowed.returned;
        result.push(account);
      }
    }

  }
  //compare accounts.id to every book's borrowers
  //if result.length is less than 10 then proceed
  //if we get a match, pull the accounts object in the the results array
  //append the accounts object with the books borrowed status
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
