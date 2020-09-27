import { startup } from "../mod.ts";
import { config } from "../deps.ts";

import * as cmds from "./commands/index.ts";
cmds;

const env = config();

startup(env.TOKEN, "test.");
