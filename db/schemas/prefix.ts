/**
 * Schema for prefixes
 */
export interface PrefixSchema {
	_id: { $oid: string };
	guildID: string;
	prefix: string;
}
