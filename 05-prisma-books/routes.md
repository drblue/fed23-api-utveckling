# Route Endpoints

## Bonus task (do last)

See if you can figure out how to link a book to an author (or an author to a book, whichever floats your boat ⛴️). In that case, use the route `POST /authors/:authorId/books`.

Add a book to a author.

```json
{
  "bookId": 2
}
```

## Authors 👴🏻

### `GET /authors`

Get all authors.

### `GET /authors/:authorId`

Get author details and all their books (if any).

### `POST /authors`

Create an author 👶🏻.

### `PATCH /authors/:authorId`

Update author details ✨.

### `DELETE /authors/:authorId`

Delete an author 💣💥.

## Books 📚

### `GET /books`

Get all books.

### `GET /books/:bookId`

Get book details and all their authors (if any).

### `POST /books`

Create a book ✍🏻.

### `PATCH /books/:bookId`

Update book details ✨.

### `DELETE /books/:bookId`

Delete a book 🔥.

### `POST /books/:bookId/authors`

Link author(s) to a book 🔗.

### `DELETE /books/:bookId/authors/:authorId`

Unlink author from a book 🔗.

## Publishers 📚

### `GET /publishers`

Get all publishers.

### `GET /publishers/:publisherId`

Get publisher details and all their authors (if any).

### `POST /publishers`

Create a publisher ✍🏻.

### `PATCH /publishers/:publisherId`

Update publisher details ✨.

### `DELETE /publishers/:publisherId`

Delete a publisher 🔥.
