# Endpoints

## Actors

### `GET /actors`

Get all actors.

### `GET /actors/:actorId`

Get actor details.

### `POST /actors`

```json
{
  "name": "Robert Downey Jr"
}
```

## Movies

### `GET /movies`

Get all movies.

### `GET /movies/:movieId`

Get movie details, including actors.

### `POST /movies`

```json
{
  "title": "2001: A Space Odessey",
  "runtime": 185,
  "releaseYear": 1968
}
```

```json
{
  "title": "Mongooses are actually not that cute",
}
```
