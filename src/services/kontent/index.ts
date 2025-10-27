import { GraphQLClient } from "graphql-request";

const endpoint = `https://graphql.kontent.ai/${process.env.KONTENT_PROJECT_ID}`;

const kontentClient = new GraphQLClient(endpoint);

export default kontentClient;
