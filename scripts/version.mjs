// @ts-check
import { readdir } from "node:fs/promises";

const runtimeDir = new URL("../generator/runtimes", import.meta.url);
const runtimes = await readdir(runtimeDir);

console.log("versions<<EOF");

for (const runtime of runtimes) {
  const { default: data } = await import(
    `../generator/runtimes/${runtime}/data.json`,
    {
      with: { type: "json" },
    }
  );
  console.log(` - ${runtime}: ${data.userAgent.split("/")[1]}`);
}

console.log("EOF");
