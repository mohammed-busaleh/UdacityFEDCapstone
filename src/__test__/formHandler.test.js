import { handleSubmit } from '../client/js/formHandler'
import {describe, expect} from "@jest/globals";

describe(handleSubmit, () => {
    test("handleSubmit test passed",async () => {
        await expect(handleSubmit).toBeDefined();

    });
});