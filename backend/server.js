const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLScalarType,
} = require("graphql");

const app = express();

const transactions = [
  { id: 1, cost: 92.1, date: new Date("2023-01-21"), customer: "Linda" },
  { id: 2, cost: 32.5, date: new Date("2023-01-25"), customer: "John" },
  { id: 3, cost: 51, date: new Date("2022-12-21"), customer: "Smith" },
  { id: 4, cost: 1003.2, date: new Date("2022-11-21"), customer: "Lily" },
  { id: 5, cost: 43, date: new Date("2023-02-01"), customer: "Smith" },
  { id: 6, cost: 56, date: new Date("2023-01-05"), customer: "Lily" },
  { id: 7, cost: 66, date: new Date("2022-11-21"), customer: "Linda" },
  { id: 8, cost: 63, date: new Date("2023-01-21"), customer: "John" },
  { id: 9, cost: 78.9, date: new Date("2022-10-21"), customer: "Smith" },
  { id: 10, cost: 45.1, date: new Date("2022-03-21"), customer: "Smith" },
  { id: 11, cost: 92.5, date: new Date("2023-01-01"), customer: "Lily" },
  { id: 12, cost: 45.8, date: new Date("2022-12-31"), customer: "Linda" },
  { id: 13, cost: 22.1, date: new Date("2022-01-21"), customer: "John" },
  { id: 14, cost: 33, date: new Date("2023-01-21"), customer: "John" },
  { id: 15, cost: 10090.5, date: new Date("2022-11-30"), customer: "Linda" },
  { id: 16, cost: 43.6, date: new Date("2023-01-04"), customer: "John" },
  { id: 17, cost: 2.2, date: new Date("2022-12-25"), customer: "Linda" },
  { id: 18, cost: 22.2, date: new Date("2022-10-25"), customer: "Mary" },
];

// create Date Type
const DateType = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.toISOString().slice(0, 10); // value sent to the client
  },
});

const TransType = new GraphQLObjectType({
  name: "Transaction",
  description: "This represents a transaction",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    cost: {
      type: GraphQLNonNull(GraphQLInt),
    },
    date: {
      type: GraphQLNonNull(DateType),
    },
    customerId: {
      type: GraphQLNonNull(DateType),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    transList: {
      type: new GraphQLList(TransType),
      description: "List of transactions",
      args: {
        customerName: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const today = new Date();
        const threePrior = today.setMonth(today.getMonth() - 3);
        const result = transactions.filter(
          (trans) =>
            trans.customer === args.customerName && trans.date >= threePrior
        );

        return result;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3005, () => console.log("server is successfully running!"));
