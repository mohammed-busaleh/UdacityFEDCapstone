import { urlChecker } from "../client/js/URLChecker.js";
describe('test Passed for urlChecker' , () => {
    test('It should be true', async () => {
        const response = urlChecker('https://blog.udacity.com/2020/07/3-ways-to-advance-beyond-entry-level-react-developer.html');
        expect(response).toBeDefined();
        expect(response).toBe(true);
    });
});
describe('Test Failed for urlChecker' , () => {
    // made many mistakes here like no . before com and httpfs in the begining 
    test('It should be false', async () => {
        const response = urlChecker("httpfs://blog.udacitycom/2020/07/3-ways-to-advance-beyond-entry-level-react-developer.html");
        expect(response).toBeDefined();
        expect(response).toBe(false);
    });
});