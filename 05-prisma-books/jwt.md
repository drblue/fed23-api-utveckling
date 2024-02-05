# JSON Web Tokens (JWT)

## `POST /login`

### Request

```json
{
  "email": "sean@banan.se",
  "password": "abc123"
}
```

## Response

```json
{
  "status": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2hhbiBOb3Jkc3Ryw7ZtIiwiZW1haWwiOiJqbkB0aGVoaXZlcmVzaXN0YW5jZS5jb20iLCJpYXQiOjE2NzU5MzczNzMsImV4cCI6MTY3NTkzNzY3M30.YFKQW0tECCJpwMFhjxBIxkI5GdjRI2BB0YodYzMgVeA"
  }
}
```

## `GET /profile`

### Headers

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2hhbiBOb3Jkc3Ryw7ZtIiwiZW1haWwiOiJqbkB0aGVoaXZlcmVzaXN0YW5jZS5jb20iLCJpYXQiOjE2NzU5MzczNzMsImV4cCI6MTY3NTkzNzY3M30.YFKQW0tECCJpwMFhjxBIxkI5GdjRI2BB0YodYzMgVeA
```
