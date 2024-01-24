# Request Call Hierarchy

## `DELETE /authors/5`

```text
server.ts
    -> app.ts
        -> routes/index.ts
            -> routes/authors.ts              /authors/*
                GET /                         /authors/
                    -> controllers/authors_controller::index

                GET /:authorId                /authors/:authorId
                    -> controllers/authors_controller::show

                POST /                        /authors
                    -> controllers/authors_controller::store

                PATCH /:authorId              /authors/:authorId
                    -> controllers/authors_controller::update

                DELETE /:authorId             /authors/:authorId
                    -> controllers/authors_controller::destroy     <-- this will handle the request

            -> routes/books.ts                /books/*
                GET /books                    /books
                GET /:bookId                  /books/:bookId
                POST /                        /books
                PATCH /:bookId                /books/:bookId
                DELETE /:bookId               /books/:bookId
                POST /authors                 /books/:bookId/authors
                DELETE /authors/:authorId     /books/:bookId/authors/:authorId

            -> routes/publishers.ts           /publishers/*
                GET /                         /publishers
                GET /:publisherId             /publishers/:publisherId
                POST /                        /publishers
                PATCH /:publisherId           /publishers/:publisherId
                DELETE /:publisherId          /publishers/:publisherId
```
