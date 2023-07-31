import createContainer from "../../src/container";

describe('Container', () => {
    let container;

    test('It needs to create a mongodb client', async () => {
        container = await createContainer();
        const client = await container.getClient();
        expect(client).not.toBe(null);
        expect(client).not.toBe(undefined);
    });

    test('It needs to return always the same instance', async () => {
        const clientA = await container.getClient();
        const clientB = await container.getClient();
        expect(clientA).toStrictEqual(clientB);
    });
    test.todo('It needs to create a repository of events');
});
