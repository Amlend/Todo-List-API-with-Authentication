const request = require("supertest");
const app = require("../app");

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
  });

  it("should not login with invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "invalidpassword" });

    expect(response.statusCode).toBe(401);
  });
});
