const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const Products = require("../models/Product");
const Users = require("../models/User");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    img: { type: GraphQLString },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    numberDaysUntilEndDiscount: { type: GraphQLInt },
    owner: {
      type: new GraphQLNonNull(UserType),
      resolve(parent, args) {
        return Users.findById(parent.owner);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Products.find({ owner: parent.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        img: { type: GraphQLString },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        numberDaysUntilEndDiscount: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const user = new Products({
          img: args.img,
          title: args.title,
          description: args.description,
          price: args.price,
          numberDaysUntilEndDiscount: args.numberDaysUntilEndDiscount,
        });
        return user.save();
      },
    },
    deleteProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Products.findByIdAndRemove(args.id);
      },
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return Products.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, age: args.age } },
          { new: true }
        );
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Products.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Products.find({});
      },
    },
    user: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return Users.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
