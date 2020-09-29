import { db, startup } from '../mod.ts';
import { config } from '../deps.ts';
import { importDirectory } from '../Utils/ImportFromDir.ts';

importDirectory(Deno.realPathSync('./Tests/commands/'));
const env = config();
db.connect(env.MONGOURL);

startup(env.TOKEN, 'test.', '730853325418922095', true);
