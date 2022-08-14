import { objectType } from "nexus";

export const UserType = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("username");
    t.nonNull.string("email");
    t.nonNull.string("password");
    // t.nonNull.list.nonNull.field("products", {
    //   type: "Product",
    //   resolve(parent, _args, _context): Promise<Product[]> {
    //     return Product.find({ where: { id: parent.id } });
    //   },
    // });
  },
});
