import { execSync } from "child_process"
import dns from "dns"
import fse from "fs-extra"
import { resolve } from "path"
import vite from "vite"
import { AdminBuildConfig } from "./types"
import { AdminDevConfig } from "./types/dev"
import { getCustomViteConfig } from "./utils"
import { injectExtensions } from "./utils/extensions/inject-extensions"

async function build(options?: AdminBuildConfig) {
  const config = getCustomViteConfig(options)

  await injectExtensions()

  await vite.build(config).catch((_err) => {
    process.exit(1)
  })

  await fse.writeJSON(
    resolve(config.build.outDir, "build-manifest.json"),
    options
  )
}

async function watch() {
  throw new Error("Not implemented")
}

async function clean() {
  throw new Error("Not implemented")
}

async function dev(options: AdminDevConfig) {
  // Resolve localhost for Node v16 and older.
  // @see https://vitejs.dev/config/server-options.html#server-host.
  dns.setDefaultResultOrder("verbatim")

  await injectExtensions()

  // Resolve Vite binary.
  const viteBin = resolve(process.cwd(), "node_modules", ".bin", "vite")
  const uiPath = resolve(__dirname, "..", "ui")

  execSync(`${viteBin} dev --config ${uiPath}/vite.config.ts`)

  // const server = await vite.createServer(getCustomViteDevConfig(options))
  // await server.listen()

  // server.printUrls()
}

export { build, dev, watch, clean }
export type { AdminBuildConfig, AdminDevConfig }
