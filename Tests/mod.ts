import { connect, startup } from '../mod.ts';
import { config } from '../deps.ts';
import { importDirectory } from '../Utils/ImportFromDir.ts';

importDirectory(Deno.realPathSync('./Tests/commands/'));
importDirectory(Deno.realPathSync('./Tests/inhibitors/'));
importDirectory(Deno.realPathSync('./Tests/monitors/'));
const env = config();
connect(env.MONGOURL);

startup(env.TOKEN, 'test.', '730853325418922095', true);
