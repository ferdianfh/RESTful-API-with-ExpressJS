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
    "fieldCount": "integer",
    "affectedRows": "integer",
    "insertId": "integer",
    "info": null,
    "serverStatus": "integer",
    "warningStatus": "integer"
  },
  "message": "Data requests input success!"
}
```

## List Users

Request :

- Method : GET
- Endpoint : `/api/admin/users/list`
- Header :
  - Accept: application/json

Response :

```json
{
  "status": "string",
  "code": "number",
  "data": [
    {
      "id": "integer, unique",
      "username": "string",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "phone": "character",
      "createdAt": "date",
      "updatedAt": "date"
    },
    {
      "id": "integer, unique",
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

## Update User

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
    "fieldCount": "integer",
    "affectedRows": "integer",
    "insertId": "integer",
    "info": null,
    "serverStatus": "integer",
    "warningStatus": "integer"
  },
  "message": "Data request update success!"
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
    "id": "integer, unique",
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

## Search User

Request :

- Method : GET
- Endpoint : `/api/admin/users/search`
- Header :
  - Accept: application/json
- Query Param :
  - username : string,
  - id : number

Response :

```json
{
  "status": "string",
  "code": "number",
  "data": [
    {
      "id": "integer, unique",
      "username": "string",
      "email": "string",
      "phone": "character"
    },
    {
      "id": "integer, unique",
      "username": "string",
      "email": "string",
      "phone": "character"
    }
  ],
  "message": "Data requests success!"
}
```

## Join Tables

Request :

- Method : GET
- Endpoint : `/api/admin/join/wallet-user-transaction`
- Header :
  - Accept: application/json

Response :

```json
{
  "status": "string",
  "code": "number",
  "data": [
    {
      "id_user": "integer",
      "email": "string",
      "id_wallet_sender": "integer",
      "id_wallet_receiver": "integer",
      "amount_transfer": "integer",
      "notes": "string",
      "date": "datetime"
    },
    {
      "id_user": "integer",
      "email": "string",
      "id_wallet_sender": "integer",
      "id_wallet_receiver": "integer",
      "amount_transfer": "integer",
      "notes": "string",
      "date": "datetime"
    }
  ],
  "message": "Join tables success!"
}
```
