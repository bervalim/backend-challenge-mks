import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
  const entities = path.join(__dirname, "./entities/**.{ts,js}");
  const migrations = path.join(__dirname, "./migrations/**.{ts,js}");

  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) throw new Error("Missing env var :'DATABASE_URL' ");

  return {
    type: "postgres",
    url: dbUrl,
    logging: true,
    entities: [entities],
    migrations: [migrations],
  };
};

export const AppDataSource: DataSource = new DataSource(dataSourceConfig());
