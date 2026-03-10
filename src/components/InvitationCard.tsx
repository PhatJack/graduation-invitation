import {
  IconMapPin,
  IconPhone,
  IconDownload,
  IconStarFilled,
  IconNorthStar,
} from "@tabler/icons-react"

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "khach-moi"

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

export function InvitationCard({ name }: { name: string }) {
  const handleDownloadTicket = async () => {
    const safeName = escapeXml(name)
    const localDancingScriptFont = `${window.location.origin}/fonts/DancingScript-VariableFont_wght.ttf`
    const ticketSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="620" viewBox="0 0 1400 620">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff8e6"/>
      <stop offset="55%" stop-color="#fff2cc"/>
      <stop offset="100%" stop-color="#ffe9b3"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7c2d12"/>
      <stop offset="50%" stop-color="#c2410c"/>
      <stop offset="100%" stop-color="#7c2d12"/>
    </linearGradient>
    <style>
      @font-face {
        font-family: 'Dancing Script';
        src: url('${localDancingScriptFont}') format('truetype');
        font-style: normal;
        font-weight: 700;
      }
      .title { font: 700 52px 'Arial'; fill: #7c2d12; letter-spacing: 2px; }
      .label { font: 600 20px 'Arial'; fill: #b45309; letter-spacing: 1.2px; }
      .value { font: 700 34px 'Arial'; fill: #78350f; }
      .small { font: 600 18px 'Arial'; fill: #92400e; }
      .name { font: 700 64px 'Dancing Script', 'Arial', cursive; fill: #7c2d12; }
      .mono { font: 700 20px 'Courier New'; fill: #7c2d12; letter-spacing: 2px; }
    </style>
  </defs>

  <rect x="0" y="0" width="1400" height="620" fill="#f8e8c4" />
  <rect x="40" y="40" width="1320" height="540" rx="28" fill="url(#bg)" stroke="#d97706" stroke-width="3" />
  <rect x="40" y="40" width="1320" height="18" fill="url(#accent)"/>
  <rect x="40" y="562" width="1320" height="18" fill="url(#accent)"/>

  <circle cx="920" cy="310" r="18" fill="#f8e8c4" stroke="#d97706" stroke-width="2"/>
  <circle cx="1320" cy="310" r="18" fill="#f8e8c4" stroke="#d97706" stroke-width="2"/>

  <line x1="940" y1="310" x2="1300" y2="310" stroke="#d97706" stroke-width="2" stroke-dasharray="8 10"/>

  <text x="86" y="180" class="title">THƯ MỜI TỐT NGHIỆP</text>
  <text x="86" y="250" class="label">KHÁCH MỜI</text>
  <text x="86" y="330" class="name">${safeName}</text>

  <text x="86" y="395" class="small">Trường Đại học Sài Gòn</text>
  <text x="86" y="430" class="small">273 An Dương Vương, phường Chợ Quán</text>
  <text x="86" y="465" class="small">Thời gian: Thứ Bảy - 13:30 - 14/03/2026</text>
  <text x="86" y="500" class="small">Liên hệ: Nguyễn Tiến Phát - 0344 248 396</text>

  <text x="980" y="128" class="label">VÉ MỜI</text>
  <text x="980" y="176" class="value">LỄ TỐT NGHIỆP</text>

  <rect x="980" y="210" width="300" height="180" rx="14" fill="#fff8e6" stroke="#d97706" stroke-width="2"/>
  <text x="1002" y="248" class="small">Ngày: 14/03/2026</text>
  <text x="1002" y="285" class="small">Giờ: 13:30</text>
  <text x="1002" y="322" class="small">Địa điểm: SGU</text>
  <text x="1002" y="359" class="small">Trang phục: Lịch sự</text>

  <text x="980" y="450" class="label">MÃ VÉ</text>
  <text x="980" y="490" class="mono">SGU-2026-14M03-1330</text>

  <rect x="980" y="515" width="300" height="35" fill="#7c2d12"/>
  <text x="995" y="539" style="font:700 18px 'Arial';fill:#fff;letter-spacing:3px;">||| || |||| | ||| || ||||</text>
</svg>`

    const svgBlob = new Blob([ticketSvg.trim()], {
      type: "image/svg+xml;charset=utf-8",
    })
    const svgUrl = URL.createObjectURL(svgBlob)

    try {
      const img = new Image()
      img.decoding = "async"

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error("Không thể render vé"))
        img.src = svgUrl
      })

      const canvas = document.createElement("canvas")
      canvas.width = 1400
      canvas.height = 620
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Không thể khởi tạo canvas")

      ctx.fillStyle = "#f8e8c4"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const pngBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1)
      )
      if (!pngBlob) throw new Error("Không thể tạo file PNG")

      const pngUrl = URL.createObjectURL(pngBlob)
      const link = document.createElement("a")
      link.href = pngUrl
      link.download = `ve-moi-${slugify(name)}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(pngUrl)
    } catch {
      alert("Không thể tải ticket PNG. Vui lòng thử lại.")
    } finally {
      URL.revokeObjectURL(svgUrl)
    }
  }

  return (
    <div
      className="flex h-svh max-h-svh min-h-svh items-center justify-center font-[Arial]"
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
        .card-glow { animation: soft-glow 5s ease-in-out infinite; }
      `}</style>

      <div
        className="card-glow relative h-full w-full max-w-lg flex-1 overflow-hidden"
        style={{
          background:
            "linear-gradient(170deg, #fffdf5 0%, #fffbec 60%, #fff8e1 100%)",
        }}
      >
        <CornerOrnament position="tl" />
        <CornerOrnament position="tr" />
        <CornerOrnament position="bl" />
        <CornerOrnament position="br" />

        <div className="relative z-10 flex flex-col items-center gap-4 px-8 py-10 text-center">
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

          {/* Avatar */}
          <div
            className="flex size-32 items-center justify-center overflow-hidden rounded-full border-4 border-white"
            style={{ boxShadow: "0 4px 20px rgba(180,83,9,0.2)" }}
          >
            <img
              src="/avt.png"
              alt="Avatar"
              className="h-full w-full object-cover"
            />
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
              className="shimmer-text mt-1 text-3xl leading-snug font-bold sm:text-4xl"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {name}
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

          {/* Info block */}
          <div className="flex w-full flex-col overflow-hidden rounded-xl border border-[rgba(180,83,9,0.2)] bg-[rgba(180,83,9,0.06)]">
            <div className="w-full px-5 py-4">
              <p
                className="text-lg leading-snug font-bold uppercase sm:text-xl"
                style={{ color: "#78350f" }}
              >
                Trường Đại Học Sài Gòn
              </p>
            </div>

            <div className="grid w-full grid-cols-3 grid-rows-3 overflow-hidden border-y border-[rgba(180,83,9,0.2)]">
              <div className="row-span-3 grid grid-rows-subgrid px-3 py-4">
                <p
                  className="text-xs tracking-wider uppercase"
                  style={{ color: "#b45309" }}
                >
                  Thứ
                </p>
                <p
                  className="text-2xl leading-tight font-bold"
                  style={{ color: "#78350f" }}
                >
                  Bảy
                </p>
                <p></p>
              </div>
              <div className="row-span-3 grid grid-rows-subgrid border-x border-[rgba(180,83,9,0.15)] bg-[rgba(245,158,11,0.1)] px-3 py-4">
                <p
                  className="text-xs tracking-wider uppercase"
                  style={{ color: "#b45309" }}
                >
                  Ngày
                </p>
                <p
                  className="text-2xl leading-tight tracking-wider font-bold"
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
              <div className="row-span-3 grid grid-rows-subgrid px-3 py-4">
                <p
                  className="text-xs tracking-wider uppercase"
                  style={{ color: "#b45309" }}
                >
                  Giờ
                </p>
                <p
                  className="text-2xl leading-tight font-bold"
                  style={{ color: "#78350f" }}
                >
                  13:30
                </p>
                <p></p>
              </div>
            </div>

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
              <span style={{ color: "#78350f" }}>Nguyễn Tiến Phát</span>
              <span style={{ color: "rgba(180,83,9,0.4)" }}>·</span>
              <a
                href="tel:0344248396"
                style={{ color: "#92400e", textDecoration: "none" }}
              >
                0344 248 396
              </a>
            </div>
          </div>

          <p
            className="text-xs italic"
            style={{ color: "rgba(120,53,15,0.5)" }}
          >
            ✦ Sự hiện diện của bạn là niềm vinh hạnh lớn nhất ✦
          </p>
          <button
            onClick={handleDownloadTicket}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-amber-700/30 bg-amber-700 px-5 py-2 text-sm font-semibold text-amber-50 transition hover:bg-amber-800"
          >
            <IconDownload size={16} />
            Tải vé
          </button>
        </div>
      </div>
    </div>
  )
}
