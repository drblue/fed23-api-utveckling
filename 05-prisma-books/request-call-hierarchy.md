# Request Call Hierarchy

## `DELETE /publishers/5`

```text
server.ts
    -> app.ts
        -> routes/index.ts
            -> routes/authors.ts          /authors/*
                GET /authors
                GET /authors/:authorId
                POST /authors
                PATCH /authors/:authorId
                DELETE /authors/:authorId
            -> routes/books.ts            /books/*
                GET /books
                GET /books/:bookId
                POST /books
                PATCH /books/:bookId
                DELETE /books/:bookId
            -> routes/publishers.ts       /publishers/*
                GET /publishers
                GET /publishers/:publisherId
                POST /publishers
                PATCH /publishers/:publisherId
                DELETE /publishers/:publisherId
```
