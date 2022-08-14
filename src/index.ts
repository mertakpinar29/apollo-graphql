import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import typeOrmConfig from "./type-orm.config";
import { Context } from "./types/Context";
import dotenv from "dotenv";
import { auth } from "./middlewares/auth";

dotenv.config();

const boot = async () => {
  try {
    const conn = await typeOrmConfig.initialize();

    const server = new ApolloServer({
      schema,
      // context: ({ req }): Context => ({
      //   conn,
      //   req,
      // }),
      context: ({ req }): Context => {
        const token =
          req && req.headers?.authorization
            ? auth(req.headers.authorization)
            : null;
        return { conn, userId: token?.userId };
      },
    });

    server.listen(5000).then(({ url }) => {
      console.log("server running at " + url);
    });
  } catch (err) {
    console.log(err);
  }
};

boot();
