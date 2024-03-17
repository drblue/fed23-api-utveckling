import { ApolloClient, DocumentNode, InMemoryCache, gql } from "@apollo/client/core";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache(),
});

const GET_BOOKS = gql`
		query GetBooks {
			books {
				id
				title
				pages
			}
		}
	`;

const execQuery = async (query: DocumentNode) => {
	const result = await client.query({
		query,
	});

	return result.data;
}

const books = await execQuery(GET_BOOKS);
console.log("books:", books);
