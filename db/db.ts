import {
  Collection,
  MongoClient,
} from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import type { PrefixSchema } from "./schemas/prefix.ts";
const client = new MongoClient();
let db;
let prefixes: Collection<PrefixSchema>;
export const connect = (url: string) => {
  client.connectWithUri(url);
  db = client.database("prefixes");
  prefixes = db.collection<PrefixSchema>("prefixes");
};

export const setPrefix = async (prefix: string, guildID: string) => {
  return await prefixes.updateOne(
    { guildID },
    {
      guildID,
      prefix,
    },
    {
      upsert: true,
    }
  );
};

export const getPrefix = async (guildID: string) => {
  return (
    await prefixes.findOne({
      guildID,
    })
  )?.prefix;
};
