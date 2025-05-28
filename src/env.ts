import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.string()
})

const environment = envSchema.parse(process.env)

export default environment
