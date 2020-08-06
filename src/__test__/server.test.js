const app = require('../server/index');
const request = require('supertest');
describe('GET /', () => {
    test('request passed', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});
describe("POST to /submit", () => {
    test("request passed", async () => {
        const response = await request(app)
        .post("/submit")
        .send({
            url: 'https://blog.udacity.com/2020/07/3-ways-to-advance-beyond-entry-level-react-developer.html'
        })
        expect(response.statusCode).toBe(200)
    });
    test("Post response passed", async () => {
        const response = await request(app)
        .post("/submit")
        .send({
            url: 'https://blog.udacity.com/2020/07/3-ways-to-advance-beyond-entry-level-react-developer.html'
        })
        expect(response).toBeDefined
    });
})