const app = require("../app")
const mongoose = require("mongoose")
const { expect, test } = require("@jest/globals")
const request = require("supertest")
beforeAll(async() => {
    await mongoose.connection.close();
});
beforeAll(async() => {
    await mongoose.connect("mongodb://localhost:27017/testing");

});
afterAll(async() => {
    await mongoose.connection.dropDatabase();
});


describe("students", () => {
    test("get error if there is no student ", async() => {
        const { body, status } = await request(app).get("/student");
        expect(status).toBe(400)
        expect(body.message).toEqual("student not found")
    });
    test("insert students", async() => {
        const res = await request(app).post("/student").send({
            name: "sushma1",
            dept: 'eee',
            gender: "female"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.results).toEqual(expect.objectContaining({}))
    });

    test("get students", async() => {
        const { body, status } = await request(app).get("/student");
        expect(status).toBe(200)
    });

});