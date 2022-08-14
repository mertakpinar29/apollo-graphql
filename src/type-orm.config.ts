import { DataSource } from "typeorm";
import { Product } from "./entities/Product";
import { User } from "./entities/User";
import dotenv from "dotenv";

dotenv.config();

export default new DataSource({
  entities: [Product, User],
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
});
