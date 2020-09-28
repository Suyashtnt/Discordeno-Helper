import {
  Collection,
  MongoClient,
} from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import type { PrefixSchema } from "./schemas/prefix.ts";
const client = new MongoClient();
let db;
let prefixes: Collection<PrefixSchema>;

/**
 * Connects to the database. Run this BEFORE your bot starts up
 * @param url Your mongoDB url
 */
export const connect = (url: string) => {
  client.connectWithUri(url);
  db = client.database("prefixes");
  prefixes = db.collection<PrefixSchema>("prefixes");
};

/**
 * Sets the prefix, used by the Prefix command generator
 * @param prefix The new prefix
 * @param guildID The Guilds ID
 */
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

/**
 * Gets the prefix from the DB
 * @param guildID The guilds ID
 */
export const getPrefix = async (guildID: string) => {
  return (
    await prefixes.findOne({
      guildID,
    })
  )?.prefix;
};