import {
  IconMapPin,
  IconPhone,
  IconStarFilled,
  IconNorthStar,
} from "@tabler/icons-react"

const GoldDivider = () => (
  <div className="flex w-full items-center gap-3">
    <div className="h-px flex-1 bg-linear-to-r from-transparent via-yellow-400 to-yellow-600" />
    <IconStarFilled className="h-3.5 w-3.5 shrink-0 text-yellow-500" />
    <div className="h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
    <IconStarFilled className="h-3.5 w-3.5 shrink-0 text-yellow-500" />
    <div className="h-px flex-1 bg-linear-to-l from-transparent via-yellow-400 to-yellow-600" />
  </div>
)

const CornerOrnament = ({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br"
}) => {
  const rotate =
    position === "tl"
      ? "0"
      : position === "tr"
        ? "90"
        : position === "bl"
          ? "270"
          : "180"
  return (
    <svg
      className="absolute h-14 w-14 opacity-50"
      style={{
        top: position.startsWith("t") ? 10 : "auto",
        bottom: position.startsWith("b") ? 10 : "auto",
        left: position.endsWith("l") ? 10 : "auto",
        right: position.endsWith("r") ? 10 : "auto",
        transform: `rotate(${rotate}deg)`,
        color: "#b45309",
      }}
      viewBox="0 0 60 60"
      fill="none"
    >
      <path
        d="M4 56 L4 4 L56 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M4 20 L4 4 L20 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="4" cy="4" r="3" fill="currentColor" />
      <circle cx="56" cy="4" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="4" cy="56" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

export function App() {
  return (
    <div
      className="flex h-svh max-h-svh min-h-svh items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #fdf6e3 0%, #fef9ee 50%, #fdf0d0 100%)",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes soft-glow {
          0%, 100% { box-shadow: 0 8px 40px rgba(180,83,9,0.12), 0 2px 8px rgba(180,83,9,0.08); }
          50%       { box-shadow: 0 12px 60px rgba(180,83,9,0.22), 0 4px 16px rgba(180,83,9,0.12); }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #92400e 0%, #d97706 25%, #f59e0b 50%, #d97706 75%, #92400e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .card-glow {
          animation: soft-glow 5s ease-in-out infinite;
        }
      `}</style>

      {/* CARD */}
      <div
        className="card-glow relative h-full w-full max-w-lg flex-1 overflow-hidden"
        style={{
          background:
            "linear-gradient(170deg, #fffdf5 0%, #fffbec 60%, #fff8e1 100%)",
        }}
      >
        {/* Corner ornaments */}
        <CornerOrnament position="tl" />
        <CornerOrnament position="tr" />
        <CornerOrnament position="bl" />
        <CornerOrnament position="br" />

        <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-10 text-center">
          {/* Header badge */}
          <div
            className="flex items-center gap-2 rounded-full px-5 py-1.5 font-semibold tracking-wide text-[#92400e] uppercase"
            style={{
              background: "rgba(180,83,9,0.08)",
              border: "1px solid rgba(180,83,9,0.3)",
            }}
          >
            <IconNorthStar className="inline-block" size={18} />
            <span className="text-sm">Thiệp Mời</span>
            <IconNorthStar className="inline-block" size={18} />
          </div>

          {/* University seal */}
          <div className="flex size-32 items-center justify-center overflow-hidden rounded-full border-4 border-white">
            <img src="/avt.png" alt="Avatar" />
          </div>

          <GoldDivider />

          {/* Invitation text */}
          <div className="flex flex-col gap-1">
            <p
              className="text-sm tracking-widest uppercase"
              style={{ color: "#92400e", letterSpacing: "0.18em" }}
            >
              Trân trọng kính mời
            </p>
            <h1
              className="shimmer-text mt-1 text-3xl font-bold sm:text-4xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Nguyễn Văn A
            </h1>
          </div>

          {/* Description */}
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: "#78350f" }}
          >
            Tham dự Lễ Trao Bằng Tốt Nghiệp
            <br />
            <span
              className="font-semibold uppercase"
              style={{ color: "#b45309" }}
            >
              năm học 2025 – 2026
            </span>
          </p>

          <GoldDivider />

          {/* Info */}
          <div className="flex w-full flex-col overflow-hidden rounded-xl border border-[rgba(180,83,9,0.2)] bg-[rgba(180,83,9,0.06)]">
            {/* School */}
            <div className="w-full px-5 py-4">
              <p
                className="text-lg leading-snug font-bold uppercase sm:text-xl"
                style={{ color: "#78350f" }}
              >
                Trường Đại Học Sài Gòn
              </p>
            </div>
            {/* Date & Time — 3 columns */}
            <div className="grid w-full grid-cols-3 overflow-hidden border-y border-[rgba(180,83,9,0.2)]">
              {/* Col 1: Thứ Bảy */}
              <div className="flex flex-col items-center justify-center gap-0.5 px-3 py-4">
                <p
                  className="text-xs tracking-wider uppercase"
                  style={{ color: "#b45309" }}
                >
                  Thứ
                </p>
                <p
                  className="text-lg leading-tight font-bold"
                  style={{ color: "#78350f" }}
                >
                  Bảy
                </p>
              </div>

              {/* Col 2: 14/3 / 2026 */}
              <div className="flex flex-col items-center justify-center gap-0.5 border-x border-[rgba(180,83,9,0.15)] bg-[rgba(245,158,11,0.1)] px-3 py-4">
                <p
                  className="text-xs tracking-wider uppercase"
                  style={{ color: "#b45309" }}
                >
                  Ngày
                </p>
                <p
                  className="text-2xl leading-none font-bold"
                  style={{ color: "#92400e" }}
                >
                  14/3
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#b45309" }}
                >
                  2026
                </p>
              </div>

              {/* Col 3: 13:30 */}
              <div
                className="flex flex-col items-center justify-center gap-0.5 px-3 py-4"
              >
                <p
                  className="text-xs tracking-wider uppercase"
                  style={{ color: "#b45309" }}
                >
                  Giờ
                </p>
                <p
                  className="text-lg leading-tight font-bold"
                  style={{ color: "#78350f" }}
                >
                  13:30
                </p>
              </div>
            </div>

            {/* Address */}
            <a
              href="https://maps.app.goo.gl/kqVFTgAGqsagsvDV6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 px-4 py-3 no-underline"
            >
              <div
                className="mt-0.5 shrink-0 rounded-lg p-1.5"
                style={{ background: "rgba(180,83,9,0.12)" }}
              >
                <IconMapPin className="h-4 w-4" style={{ color: "#b45309" }} />
              </div>
              <div className="text-left">
                <p
                  className="mb-0.5 text-xs tracking-wider uppercase"
                  style={{ color: "#b45309" }}
                >
                  Địa điểm
                </p>
                <p
                  className="text-sm leading-snug font-semibold"
                  style={{ color: "#78350f" }}
                >
                  273 An Dương Vương, phường Chợ Quán
                </p>
                <p className="mt-0.5 text-xs" style={{ color: "#d97706" }}>
                  Xem bản đồ →
                </p>
              </div>
            </a>
          </div>

          <GoldDivider />

          {/* Contact */}
          <div className="flex flex-col items-center gap-1">
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#b45309", letterSpacing: "0.15em" }}
            >
              Khi tới hãy gọi
            </p>
            <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
              <IconPhone className="h-4 w-4" style={{ color: "#b45309" }} />
              <span
                style={{ color: "#78350f" }}
              >
                Nguyễn Tiến Phát
              </span>
              <span style={{ color: "rgba(180,83,9,0.4)" }}>·</span>
              <a
                href="tel:0344248396"
                style={{ color: "#92400e", textDecoration: "none" }}
              >
                0344 248 396
              </a>
            </div>
          </div>

          {/* Footer note */}
          <p
            className="text-xs italic"
            style={{ color: "rgba(120,53,15,0.5)" }}
          >
           ✦ Sự hiện diện của bạn là niềm vinh hạnh lớn nhất ✦
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
