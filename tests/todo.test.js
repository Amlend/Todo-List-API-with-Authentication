const request = require("supertest");
const app = require("../app");
let token;
let todoId;

describe("User Registration Endpoint", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/register")
      .send({ username: "testuser", password: "testpassword" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully"
    );
  });
});

describe("User Login Endpoint", () => {
  it("should login with valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "testpassword" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    // Store the token for subsequent requests
    token = response.body.token;
  });

  it("should not login with invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "invalidpassword" });

    expect(response.statusCode).toBe(401);
  });
});

describe("Todo CRUD Operations", () => {
  it("should create a new todo item", async () => {
    const response = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Todo",
        description: "Test Description",
        dueDate: "2024-05-31",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("title", "Test Todo");

    todoId = response.body._id; // Store the ID of the created todo for update and delete tests
  });

  it("should return paginated todo items", async () => {
    const response = await request(app)
      .get("/todos?page=1&limit=1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1); // Assuming 1 todos per page
  });

  it("should return filtered todo items", async () => {
    const response = await request(app)
      .get("/todos?title=test&dueDate=2024-05-31")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  it("should update an existing todo item", async () => {
    const response = await request(app)
      .put(`/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Todo",
        description: "Updated Description",
        dueDate: "2024-06-30",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Todo");
  });

  it("should delete an existing todo item", async () => {
    const response = await request(app)
      .delete(`/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Todo deleted successfully"
    );
  });
});
