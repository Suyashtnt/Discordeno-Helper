/**
 * Schema for prefixes
 */
export interface PrefixSchema {
	_id: { $oid: string };
	/**
	 * The guilds ID
	 */
	guildID: string;
	/**
	 * The guilds custom prefix
	 */
	prefix: string;
}
