import { ApolloServer } from "@apollo/server"
import { beforeEach, describe, it } from "node:test"
import {execSchema, MyContext} from "../execSchema"
import { AddProblemInput } from "__generated__/resolvers-types"

describe("Test Server created with executable schema", () => {

  it('Adds a non-existant problem', () => {
    const testServer = new ApolloServer({
      schema: execSchema,
      introspection: true,
    });
      
  })

})