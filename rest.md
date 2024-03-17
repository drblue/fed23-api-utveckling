# REST (REST API)

REpresentational
State
Transfer

URI = Uniform Resource Identifier
URL = Uniform Resource Locator

## CRUD

```text
C = Create
R = Read
U = Update
D = Delete
```

```text
HTTP Verb   URI                  Action                 CRUD     Name
----------- -------------------- ---------------------- -------- ------
GET         /users               Get all users          Read     index
GET         /users/:userId       Get a single user      Read     show
POST        /users               Create a new user      Create   store
PATCH/PUT   /users/:userId       Update a single user   Update   update
DELETE      /users/:userId       Delete a single user   Delete   destroy
```

## RESTful API

Stateless REST API

```text
PATCH /users/4
Authorization: Basic 456456a1ee3f:a34e5423c
```

```text
DELETE /users/4
Authorization: Basic 456456a1ee3f:a34e5423c
```
