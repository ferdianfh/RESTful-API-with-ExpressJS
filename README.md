# API Specification

## Create User

Request :

- Method : POST
- Endpoint : `/api/admin/users/create`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "username": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "phone": "character"
}
```

Response :

```json
{
  "status": "string",
  "code": "number",
  "data": {
    "id": "integer, unique",
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone": "character",
    "createdAt": "timestamp",
    "updatedAt": "datetime"
  },
  "message": "Data requests success!"
}
```

## Get Details User

Request :

- Method : GET
- Endpoint : `/api/admin/users/details/{id_user}`
- Header :
  - Accept: application/json

Response :

```json
{
  "status": "string",
  "code": "number",
  "data": {
    "id": "string, unique",
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone": "character",
    "createdAt": "timestamp",
    "updatedAt": "datetime"
  },
  "message": "Data request success!"
}
```

## Update Product

Request :

- Method : PUT
- Endpoint : `/api/admin/users/update/{id_user}`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "username": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "phone": "character"
}
```

Response :

```json
{
  "status": "string",
  "code": "number",
  "data": {
    "id": "string, unique",
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone": "character",
    "createdAt": "timestamp",
    "updatedAt": "datetime"
  },
  "message": "Data request update success!"
}
```

## List Users

Request :

- Method : GET
- Endpoint : `/api/admin/users/list`
- Header :
  - Accept: application/json
- Query Param :
  - size : number,
  - page : number

Response :

```json
{
  "status": "string",
  "code": "number",
  "data": [
    {
      "id": "string, unique",
      "username": "string",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "phone": "character",
      "createdAt": "date",
      "updatedAt": "date"
    },
    {
      "id": "string, unique",
      "username": "string",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "phone": "character",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "message": "Data requests success!"
}
```

## Delete User

Request :

- Method : DELETE
- Endpoint : `/api/admin/users/remove/{id_user}`
- Header :
  - Accept: application/json

Response :

```json
{
  "status": "string",
  "code": "number",
  "message": "Data requests delete success!"
}
```
