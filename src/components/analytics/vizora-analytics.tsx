"use client"

import { useEffect } from "react"
import { Vizora } from "@/vendor/vizora"

export function VizoraAnalytics() {
  useEffect(() => {
    const vizora = new Vizora({
      projectKey: process.env.NEXT_PUBLIC_VIZORA_PROJECT_KEY!,
      endpoint: process.env.NEXT_PUBLIC_VIZORA_EVENTS_ENDPOINT!,
      replay: {
        enabled: true,
        endpoint: process.env.NEXT_PUBLIC_VIZORA_REPLAY_ENDPOINT!,
      },
    })

    void vizora.start().catch((error: unknown) => {
      console.error("Vizora failed to start", error)
    })

    return () => {
      void vizora.stop().catch((error: unknown) => {
        console.error("Vizora failed to stop", error)
      })
    }
  }, [])

  return null
}
