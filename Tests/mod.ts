import { db, startup } from '../mod.ts';
import { config } from '../deps.ts';

import * as cmds from './commands/index.ts';
cmds;

const env = config();
db.connect(env.MONGOURL);

startup(env.TOKEN, 'test.', '730853325418922095', true);
