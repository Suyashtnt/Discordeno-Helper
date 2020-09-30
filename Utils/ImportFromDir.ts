let uniqueFilePathCounter = 0;

/**
 * loads all commands from that directory
 * @param path the path
 */
export async function importDirectory(path: string) {
  const files = Deno.readDirSync(Deno.realPathSync(path));

  for (const file of files) {
    if (!file.name) continue;

    const currentPath = `${path}/${file.name}`;

    if (file.isFile) {
      const cmd = await import(
        `file:///${currentPath}#${uniqueFilePathCounter}`
      );
      cmd;
      continue;
    }
    importDirectory(currentPath);
  }
  uniqueFilePathCounter++;
}
