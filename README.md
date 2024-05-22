# Todo-List-API-with-Authentication

This API allows users to manage todo items with user authentication using Node.js and Express.js.

## Base URL

http://localhost:3000

## Authentication

- **POST /register**

  - Register a new user.
  - Request Body: `{ "username": "example", "password": "password" }`

- **POST /login**
  - Login with existing credentials.
  - Request Body: `{ "username": "example", "password": "password" }`
  - Response: `{ "token": "your-auth-token" }`

## Todo Operations

- **GET /todos**

  - Retrieve all todo items for the authenticated user.
  - Query Parameters:
    - `page`: Page number for pagination.
    - `limit`: Number of items per page.
    - `title`: Filter by todo title.
    - `dueDate`: Filter by due date.

- **POST /todos**

  - Create a new todo item.
  - Request Body: `{ "title": "Example Todo", "description": "Description", "dueDate": "2024-05-31" }`

- **PUT /todos/:id**

  - Update an existing todo item by ID.
  - Request Body: `{ "title": "Updated Todo", "description": "Updated Description", "dueDate": "2024-06-30" }`

- **DELETE /todos/:id**
  - Delete a todo item by ID.

### Example Usage

#### Create a Todo

```http
POST /todos
Content-Type: application/json
Authorization: Bearer your-auth-token

{
  "title": "Example Todo",
  "description": "Description",
  "dueDate": "2024-05-31"
}
```

## Update a Todo

```http
PUT /todos/your-todo-id
Content-Type: application/json
Authorization: Bearer your-auth-token

{
  "title": "Updated Todo",
  "description": "Updated Description",
  "dueDate": "2024-06-30"
}
```

## Delete a Todo

```http
DELETE /todos/your-todo-id
Authorization: Bearer your-auth-token
```

## Error Responses

- 400 Bad Request
  - Invalid request format or missing required fields.
- 401 Unauthorized
  - Authentication failure or invalid token.
- 404 Not Found
  - Resource not found, such as a todo item.
- 500 Internal Server Error
  - Server-side errors or database issues.

## Running the application

**Prerequisites:**

- Node.js and npm installed on your system.

**Steps:**

- Clone or download the application codebase.

- Navigate to the project directory in your terminal.

- Install dependencies:

```
npm install
```

```
npm start
```

This will typically start the server on a port like localhost:3000 (check the code for the specific port).

**API Usage**

Once the server is running, you can use tools like Postman or make API requests directly from your code to interact with the contact management endpoints. Refer to the codebase for specific API endpoint definitions and request/response structures.
