import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Context } from "../types/Context";

export const ProductType = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.float("price");
    t.nonNull.int("creatorId");
    t.field("createdBy", {
      type: "User",
      resolve(parent, _args, _context): Promise<User | null> {
        return User.findOne({ where: { id: parent.creatorId } });
      },
    });
  },
});

// let products: NexusGenObjects["Product"][] = [
//   {
//     id: 1,
//     name: "Product 1",
//     price: 15.99,
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     price: 10.99,
//   },
// ];

export const ProductsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("products", {
      type: "Product",
      resolve(_parent, _args, _context: Context, _info): Promise<Product[]> {
        //const { conn } = context;
        //return conn.query(`select * from product`);
        return Product.find();
      },
    });
  },
});

export const ProductMutation = extendType({
  type: "Mutation",
  definition(t) {
    // t.nonNull.field("createProduct", {
    //   type: "Product",
    //   args: {
    //     name: nonNull(stringArg()),
    //     price: nonNull(floatArg()),
    //     creatorId: nonNull(floatArg()),
    //   },
    //   resolve(_parent, args, _context, _info): Promise<Product> {
    //     const { name, price, creatorId } = args;
    //     return Product.create({ name, price, creatorId }).save();
    //   },
    // });

    t.nonNull.field("createProduct", {
      type: "Product",
      args: {
        name: nonNull(stringArg()),
        price: nonNull(floatArg()),
        creatorId: nonNull(floatArg()),
      },
      resolve(_parent, args, context: Context, _info): Promise<Product> {
        const { name, price } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't create product without logging in.");
        }

        return Product.create({ name, price, creatorId: userId }).save();
      },
    });
  },
});
