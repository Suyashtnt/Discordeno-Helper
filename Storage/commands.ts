import type { command } from '../Types/command.ts';

/**
 * all commands known by the framework
 */
export let commands = new Map<string, command>();
/**
 * all categories known by the framework
 */
export let categories: string[] = [];
