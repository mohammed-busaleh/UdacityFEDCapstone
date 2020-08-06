import { handleSubmit } from '../client/js/formHandler'

describe(handleSubmit, () => {
    test("handleSubmit test passed", () => {
        expect(handleSubmit).toBeDefined
    });
});