const express = require("express");
const { expect, test } = require("@jest/globals")
const request = require('supertest');
const app = express();
const bookroute = require("../routes/books_route");
app.use(express.json());
app.use("/api/books", bookroute);
app.listen(7005, () => {
    console.log("app listenring at the port 7005")
})
describe(' books', () => {
    test("get books", async() => {
        const { body, status } = await request(app).get("/api/books");
        expect(status).toBe(200)
        expect(body).toEqual(expect.arrayContaining([expect.objectContaining({
            name: expect.any(String),
            author: expect.any(String),
            id: expect.any(Number)
        })]))
    });
    test('POST /api/books - errors', async() => {

        const { body, statusCode } = await request(app).post('/api/books').send({
            name: "sushma",
            author: ''
        });
        expect(statusCode).toBe(400);
        expect(body).toEqual({
            errors: [{
                "location": "body",
                "msg": "author name is required",
                "param": "author",
                "value": "",
            }]
        });
    });
    it('POST /api/books - success', async() => {
        const { body, statusCode } = await request(app).post('/api/books').send({
            name: "It's a Wonderful Life",
            author: "ruskin bond"
        });
        expect(statusCode).toBe(200);
        expect(body).toEqual({
            message: 'success'
        });
    });
    test('Put /api/books - errors', async() => {

        const { body, statusCode } = await request(app).put('/api/books/15').send();
        expect(statusCode).toBe(404);
        expect(body).toEqual({
            error: true,
            message: 'Book not found'
        });
    });
    test('Put /api/books - success', async() => {

        const { body, statusCode } = await request(app).put('/api/books/1').send({
            name: "In An Ideal World",
            author: "kunal"
        });
        expect(statusCode).toBe(200);
        expect(body).toEqual({
            message: 'success'
        });
    });
    test("delete/book-success", async() => {
        const { body, statusCode } = await request(app).delete("/api/books/9");
        expect(statusCode).toBe(200)
        expect(body).toEqual({
            message: "deleted book"
        })
    })
    test('delete /api/books - errors', async() => {

        const { body, statusCode } = await request(app).put('/api/books/15').send();
        expect(statusCode).toBe(404);
        expect(body).toEqual({
            error: true,
            message: 'Book not found'
        });
    });
});