function sortAndTrim(array) {
  return array.sort((count1, count2) => count1.count < count2.count ? 1 : -1).slice(0,5);
}

function getTotalBooksCount(books) {
  let totalBooks = 0;
  for (const book in books) {
    totalBooks++;
  }
  return totalBooks;
}

function getTotalAccountsCount(accounts) {
  let accountNum = 0;
  for (const account in accounts){
    accountNum++;
  }
  return accountNum;
}

function getBooksBorrowedCount(books) {
  let booksBorrowed = 0;
  for (const book in books){
    if (!books[book].borrows[0].returned) {
      booksBorrowed++;
    }
  }
  return booksBorrowed;
}

function getMostCommonGenres(books) {
  let top5Genres = [];
  let counter = 0;
  //make next line helper function that sorts strings by a category
  let initialCount = books.map(e => e.genre).sort((word1,word2) => (word1.toLowerCase() > word2.toLowerCase() ? 1 : -1));
  //console.log(initialCount) 
  for (let i = 0; i < initialCount.length; i++) {
    counter++;
    const genre = initialCount[i];
    if (genre !== initialCount[i+1]){
      top5Genres.push({name: genre, count: counter});
      counter = 0;
    }
  }
  return sortAndTrim(top5Genres);
}

function getMostPopularBooks(books) {
  let booksByPopularity = [];
  for (const book in books){
    booksByPopularity.push({name: books[book].title, count: books[book].borrows.length})
  }
  return sortAndTrim(booksByPopularity);
}

function getFormattedAuthorNamesAndIds(authors) {
  let authorsAndIds = []
  for (const index in authors){
    const author = authors[index];
    const combinedName = `${author.name.first} ${author.name.last}`;
    authorsAndIds.push({id: author.id, name: combinedName});
  }
  return authorsAndIds;
}

function stripOutIds(authorInfo) {
  for (const index in authorInfo) {
    const author = authorInfo[index];
    delete author.id;
  }
}

function getAuthorBorrowsTotal(authors, books) {
  for (const index in authors){
  const author = authors[index];
  let counter = 0;  
  for (const index1 in books) {
    const book = books[index1];
    if (author.id === book.authorId) {
      counter += book.borrows.length; 
    }
  }
  author.count = counter;
}
return authors;
}

function getMostPopularAuthors(books, authors) {
  let authorsByPopularity = getFormattedAuthorNamesAndIds(authors);
  authorsByPopularity = getAuthorBorrowsTotal(authorsByPopularity, books);  
  stripOutIds(authorsByPopularity);  
  return sortAndTrim(authorsByPopularity);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
