const app = require("../app")
const mongoose = require("mongoose")
const { expect, test } = require("@jest/globals")
const request = require("supertest")

beforeAll(async() => {
    await mongoose.connection.close();
    await mongoose.connect("mongodb://localhost:27017/testing");

});
afterAll(async() => {
    await mongoose.connection.dropDatabase();
});


describe("students", () => {

    test("insert students", async() => {
        const res = await request(app).post("/student").send({
            name: "sushma1",
            dept: 'eee',
            gender: "female"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({}))
    });

    test("get by id ", async() => {
        const studentid = 1;
        const { body, status } = await request(app).get(`/student/${studentid}`);
        expect(status).toBe(200)
    });

    test("get:return error message if id doesnt exists", async() => {
        const studentid = 34;
        const { body, status } = await request(app).get(`/student/${studentid}`);
        expect(status).toBe(400)
    });

    test("update students", async() => {
        const studentid = 1;
        const res = await request(app).put(`/student/${studentid}`).send({
            name: "sushma12",
            dept: 'eee1',
            gender: "female"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({}))
    });
    test("put :returns error message if id doesn't exist", async() => {
        const studentid = 15;
        const res = await request(app).put(`/student/${studentid}`).send({
            name: "sushma12",
            dept: 'eee1',
            gender: "female"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(expect.objectContaining({ err: "student id not found" }))
    });
    test("delete:returns error message if id doesn't exist", async() => {
        const studentid = 17;
        const res = await request(app).delete(`/student/${studentid}`);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(expect.objectContaining({ err: "student id not found" }))


    })
    test("delete student", async() => {
        const studentid = 1;
        const res = await request(app).delete(`/student/${studentid}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({ message: "deleted student", results: expect.objectContaining({}) }))
    });
});