import createContainer from "../../src/container";

describe('Container', () => {
    let container;

    test('It needs to create a mongodb client', async () => {
        container = await createContainer();
        const client = await container.getClient();
        expect(client).not.toBe(null);
        expect(client).not.toBe(undefined);
    });
});
