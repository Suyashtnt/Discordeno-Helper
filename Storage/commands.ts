import type { command } from '../Types/command.ts';

/**
 * all commands known by the framework
 */
export let commands = new Map<string, command>();
export let categories: string[] = [];
