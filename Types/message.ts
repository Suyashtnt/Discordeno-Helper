// deno-lint-ignore-file
import { Message } from 'https://2b4uf3aywcv5mde67pmncptxeqv2yujmbcssaxy5n7meddskiwia.arweave.net/0HlC7Biwq9YMnvvY0T53JCusUSwIpSBfHW_YQY5KRZA/src/structures/message.ts';
import { Channel } from 'https://2b4uf3aywcv5mde67pmncptxeqv2yujmbcssaxy5n7meddskiwia.arweave.net/0HlC7Biwq9YMnvvY0T53JCusUSwIpSBfHW_YQY5KRZA/src/structures/channel.ts';
import { Guild } from 'https://2b4uf3aywcv5mde67pmncptxeqv2yujmbcssaxy5n7meddskiwia.arweave.net/0HlC7Biwq9YMnvvY0T53JCusUSwIpSBfHW_YQY5KRZA/src/structures/guild.ts';

export interface message extends Message {
	channel?: Channel;
	guild?: Guild;
	reply: (message: string) => any;
	return: (mesage: string) => any;
}
