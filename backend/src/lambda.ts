// import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { ApolloServer } from "apollo-server-lambda";
import { schema } from "./schema";

// export const handler: APIGatewayProxyHandlerV2 = async (event) => {
//   return {
//     statusCode: 200,
//     headers: { "Content-Type": "text/plain" },
//     body: `Hello, World! Your request was received at ${event.requestContext.time}.`,
//   };
// };

const server = new ApolloServer({
  schema,
});

export const handler = server.createHandler();
