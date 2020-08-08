import {describe, expect} from "@jest/globals";

const app = require('../server/index');
const request = require('supertest');
describe('GET /', () => {
    test('request passed', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});
describe("POST to /geoSubmit", () => {
    test("request passed", async () => {
        const response = await request(app)
        .post("/geoSubmit")
        .send({
           body:'London'
        })
        expect(response.statusCode).toBe(200)
    });

})