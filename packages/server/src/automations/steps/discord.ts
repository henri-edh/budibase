import fetch from "node-fetch"
import { getFetchResponse } from "./utils"
import { ExternalAppStepOutputs, DiscordStepInputs } from "@budibase/types"

const DEFAULT_USERNAME = "Budibase Automate"
const DEFAULT_AVATAR_URL = "https://i.imgur.com/a1cmTKM.png"

export async function run({
  inputs,
}: {
  inputs: DiscordStepInputs
}): Promise<ExternalAppStepOutputs> {
  let { url, username, avatar_url, content } = inputs
  if (!username) {
    username = DEFAULT_USERNAME
  }
  if (!avatar_url) {
    avatar_url = DEFAULT_AVATAR_URL
  }
  if (!url?.trim()?.length) {
    return {
      httpStatus: 400,
      response: "Missing Webhook URL",
      success: false,
    }
  }
  let response
  try {
    response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        username,
        avatar_url,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err: any) {
    return {
      httpStatus: 400,
      response: err.message,
      success: false,
    }
  }

  const { status, message } = await getFetchResponse(response)
  return {
    httpStatus: status,
    success: status === 200 || status === 204,
    response: message,
  }
}
