import { ApolloServer } from "@apollo/server";
import { describe, it } from "node:test";
import { execSchema } from "../execSchema";
describe("Test Server created with executable schema", () => {
    it('Adds a non-existant problem', () => {
        const testServer = new ApolloServer({
            schema: execSchema,
            introspection: true,
        });
    });
});
