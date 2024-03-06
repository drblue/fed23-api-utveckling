// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `#graphql
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	type Author {
		id: Int!
		name: String!
		birthyear: Int
		books: [Book!]
	}

	# This "Book" type defines the queryable fields for every book in our data source.
	type Book {
		id: Int!
		title: String!
		pages: Int!
		authors: [Author!]
		publisherId: Int
		publisher: Publisher
	}

	type Publisher {
		id: Int!
		name: String!
		books: [Book!]
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		authors: [Author!]
		books: [Book!]
		publishers: [Publisher!]

		author(id: Int!): Author
		book(id: Int!): Book
		publisher(id: Int!): Publisher
	}

	# This "Mutation" type defines the mutatable fields for every type in our data source.
	type Mutation {
		# Author create, update and delete
		createAuthor(data: AuthorInput!): Author!
		updateAuthor(id: Int!, data: AuthorInput!): Author!
		deleteAuthor(id: Int!): Author

		# Book create, update and delete
		createBook(data: BookInput!): Book!
		updateBook(id: Int!, data: BookInput!): Book!
		deleteBook(id: Int!): Book!

		# Publisher create, update and delete
		createPublisher(data: PublisherInput!): Publisher!
		updatePublisher(id: Int!, data: PublisherInput!): Publisher!
		deletePublisher(id: Int!): Publisher!
	}

	# Input types
	input AuthorInput {
		name: String!
		birthyear: Int
	}

	input BookInput {
		title: String!
		pages: Int!
		authorIds: [Int!]
		publisherId: Int
	}

	input PublisherInput {
		name: String!
	}
`;

export default typeDefs;
