import { useEffect, useMemo, useRef, useState } from "react"
import { ScrollIntro } from "./components/ScrollIntro"
import { InvitationCard } from "./components/InvitationCard"

type Phase = "intro" | "opening" | "card"

export function App() {
  const [phase, setPhase] = useState<Phase>("intro")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const name = useMemo(
    () => new URLSearchParams(window.location.search).get("name") || "Bạn",
    []
  )

  useEffect(() => {
    const pageTitle = `Thư mời dự lễ tốt nghiệp - ${name} | Đại học Sài Gòn`
    const description = `Trân trọng kính mời ${name} tham dự lễ tốt nghiệp tại Trường Đại học Sài Gòn. Thời gian: 13:30 ngày 14/03/2026.`
    const url = window.location.href

    document.title = pageTitle

    const upsertMetaByName = (metaName: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[name="${metaName}"]`)
      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute("name", metaName)
        document.head.appendChild(tag)
      }
      tag.setAttribute("content", content)
    }

    const upsertMetaByProperty = (property: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute("property", property)
        document.head.appendChild(tag)
      }
      tag.setAttribute("content", content)
    }

    upsertMetaByName("description", description)
    upsertMetaByProperty("og:title", pageTitle)
    upsertMetaByProperty("og:description", description)
    upsertMetaByProperty("og:url", url)
    upsertMetaByName("twitter:title", pageTitle)
    upsertMetaByName("twitter:description", description)
  }, [name])

  useEffect(() => {
    const audio = new Audio("/song.mp3")
    audio.loop = true
    audio.volume = 0.45
    audioRef.current = audio

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          window.removeEventListener("pointerdown", tryPlay)
          window.removeEventListener("keydown", tryPlay)
        })
        .catch(() => {
          // Autoplay may be blocked; first user gesture will retry.
        })
    }

    tryPlay()
    window.addEventListener("pointerdown", tryPlay)
    window.addEventListener("keydown", tryPlay)

    return () => {
      window.removeEventListener("pointerdown", tryPlay)
      window.removeEventListener("keydown", tryPlay)
      audio.pause()
      audio.currentTime = 0
      audioRef.current = null
    }
  }, [])

  const handleOpen = () => {
    setPhase("opening")
    setTimeout(() => setPhase("card"), 1800)
  }

  return (
    <div
      className="relative h-svh overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fdf6e3 0%, #fef9ee 50%, #fdf0d0 100%)",
      }}
    >
      {/* === CARD layer (underneath) === */}
      <div
        className="absolute inset-0 overflow-y-hidden"
        style={{
          opacity: phase === "intro" ? 0 : 1,
          transform: phase === "intro" ? "translateY(40px)" : "translateY(0)",
          transition:
            "opacity 0.9s 0.65s ease-out, transform 0.9s 0.65s ease-out",
          pointerEvents: phase === "card" ? "auto" : "none",
        }}
      >
        <InvitationCard name={name} />
      </div>

      {/* === INTRO layer (on top, slides up when opening) === */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: phase === "intro" ? "translateY(0)" : "translateY(-103%)",
          transition: "transform 1.15s cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents: phase === "intro" ? "auto" : "none",
        }}
      >
        <ScrollIntro
          name={name}
          onOpen={handleOpen}
          isOpening={phase !== "intro"}
        />
      </div>
    </div>
  )
}

export default App
