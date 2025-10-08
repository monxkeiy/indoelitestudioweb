import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Gamepad2,
  MapPinned,
  Users,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Stars,
  Search,
  PlayCircle,
  Trophy,
  ArrowUpRight,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

const DISCORD_LINK = "https://discord.gg/4sxwEPx8NB";
const ROBLOX_GROUP_LINK = "https://www.roblox.com/share/g/650469432";

const logos = {
  // taruh URL .png/.svg jika ada brand
  square: "",
};

const heroImage = ""; // taruh URL banner jika ada, atau biarkan kosong

// ================= MAPS =================
const maps = [
  {
    id: "goa-batu-bgtt",
    name: "Goa Batu BGTT",
    description:
      "Pendakian sinematik dengan rintangan variatif dan fitur carry. Stabil di device low-end, cocok bareng teman.",
    playUrl: "https://www.roblox.com/share?code=fef4e95962d47446b3579d9b2c3b1e36&type=ExperienceDetails&stamp=1759901532852",
    thumb: "", // opsional gambar
    tags: ["Obby", "Mountain", "Carry"],
    difficulty: 3,
  },
  {
    id: "mount-bj",
    name: "Mount BJ",
    description:
      "Rute menanjak ala speedrun dengan checkpoint rapat, pemandangan bagus, dan event summit.",
    playUrl: "https://www.roblox.com/share?code=31c8096fd8de1e42ae2582622778cc68&type=ExperienceDetails&stamp=1759901581092",
    thumb: "",
    tags: ["Adventure", "Speedrun", "Carry"],
    difficulty: 4,
  },
];

// =============== UI Helpers =================
function classNames(...a) {
  return a.filter(Boolean).join(" ");
}

function PlaceholderThumb({ title, icon: Icon = Gamepad2 }) {
  return (
    <div className="relative h-44 w-full rounded-2xl bg-gradient-to-br from-slate-800 to-zinc-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(600px_200px_at_50%_-20%,#ffffff33,transparent)]" />
      <Icon className="w-10 h-10 opacity-80" />
      <span className="sr-only">{title}</span>
    </div>
  );
}

function DifficultyDots({ level = 1 }) {
  const dots = new Array(5).fill(0).map((_, i) => i < level);
  return (
    <div className="flex gap-1">{
      dots.map((on, i) => (
        <span
          key={i}
          className={classNames(
            "h-2 w-2 rounded-full",
            on ? "bg-emerald-400" : "bg-white/15"
          )}
        />
      ))
    }</div>
  );
}

function Tag({ children }) {
  return (
    <span className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10">
      {children}
    </span>
  );
}

function MapCard({ map }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="group rounded-3xl p-3 bg-zinc-900/40 border border-white/10 backdrop-blur-xl hover:bg-zinc-900/60 hover:border-white/20"
    >
      <div className="overflow-hidden rounded-2xl relative">
        {map.thumb ? (
          <img src={map.thumb} alt={map.name} className="h-44 w-full object-cover" loading="lazy" />
        ) : (
          <PlaceholderThumb title={map.name} />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
        />
      </div>
      <div className="px-1 pt-3 pb-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{map.name}</h3>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4" />
            <DifficultyDots level={map.difficulty} />
          </div>
        </div>
        <p className="text-sm text-zinc-300/90 leading-relaxed mt-1 line-clamp-3">
          {map.description}
        </p>
        {map.tags?.length ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {map.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}
        <div className="mt-4 flex items-center gap-2">
          <a
            href={map.playUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-2 text-sm"
          >
            <PlayCircle className="w-4 h-4" /> Mainkan
          </a>
          <a
            href={map.playUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 hover:border-white/20 px-3 py-2 text-sm"
          >
            <MapPinned className="w-4 h-4" /> Halaman Roblox
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ icon: Icon, title, value, sub }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-5">
      <div className="flex items-center gap-2 text-zinc-300">
        <Icon className="w-4 h-4" />
        <span className="text-xs tracking-wide">{title}</span>
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {sub && <div className="text-xs text-zinc-400 mt-1">{sub}</div>}
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return maps;
    return maps.filter((m) =>
      [m.name, m.description, ...(m.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(k)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Parallax Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-10 left-0 right-0 h-72 bg-[radial-gradient(700px_300px_at_30%_0%,#34d39922,transparent),radial-gradient(700px_300px_at_70%_0%,#38bdf822,transparent)]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 shadow group-hover:scale-105 transition" />
            <div>
              <p className="text-[11px] text-zinc-300">Comunity</p>
              <h1 className="text-base font-semibold tracking-tight">Indo Elite Studio</h1>
            </div>
          </a>
          <nav className="hidden sm:flex items-center gap-3">
            <a href="#maps" className="text-sm text-zinc-300 hover:text-white">Maps</a>
            <a href="#community" className="text-sm text-zinc-300 hover:text-white">Komunitas</a>
            <a href="#about" className="text-sm text-zinc-300 hover:text-white">Tentang</a>
          </nav>
          <button
            onClick={() => setOpen((p) => !p)}
            className="sm:hidden rounded-xl border border-white/10 px-3 py-2 text-sm"
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
        {open && (
          <div className="sm:hidden border-t border-white/10">
            <div className="px-4 py-2 flex flex-col gap-2">
              <a href="#maps" onClick={() => setOpen(false)} className="text-sm text-zinc-300 hover:text-white">Maps</a>
              <a href="#community" onClick={() => setOpen(false)} className="text-sm text-zinc-300 hover:text-white">Komunitas</a>
              <a href="#about" onClick={() => setOpen(false)} className="text-sm text-zinc-300 hover:text-white">Tentang</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_0%,#34d39922,transparent),radial-gradient(600px_300px_at_80%_0%,#38bdf822,transparent)]" />
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <BadgeCheck className="w-3.5 h-3.5" /> Studio Roblox Indonesia
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mt-3">
                Kompleks • Aesthetic • Performa
              </h2>
              <p className="mt-3 text-zinc-300 md:text-lg">
                Selamat datang di <span className="font-semibold">Indo Elite Studio</span> —
                fokus pada map pendakian & obby yang halus, menantang, dan seru bareng komunitas.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#maps"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:bg-zinc-200"
                >
                  Jelajahi Maps <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#community"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-white/30"
                >
                  Gabung Komunitas
                </a>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                <Stat icon={Stars} title="Maps" value={`${maps.length}+`} sub="rilis" />
                <Stat icon={Trophy} title="Summit Events" value="Aktif" sub="mingguan" />
                <Stat icon={Sparkles} title="Optimized" value="60+ FPS" sub="target" />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 overflow-hidden">
                {heroImage ? (
                  <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center">
                    <Gamepad2 className="w-20 h-20 opacity-60" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 hidden md:block w-40 h-40 rounded-3xl bg-gradient-to-tr from-emerald-400/30 to-sky-400/30 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search + Maps */}
      <section id="maps" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <MapPinned className="w-5 h-5" /> Maps Kami
          </h3>
          <div className="relative w-full md:w-80">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari map, tag, deskripsi..."
              className="w-full rounded-2xl bg-zinc-900/60 border border-white/10 px-9 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-white/20"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MapCard key={m.id} map={m} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-zinc-400 mt-4">Tidak ada hasil untuk "{q}".</p>
        )}
        <p className="text-xs text-zinc-400 mt-4">Map Ada Bug? Report Admin Via Discord</p>
      </section>

      {/* Community */}
      <section id="community" className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-white/10 p-6 md:p-8 bg-zinc-900/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <Users className="w-5 h-5" /> Komunitas Indo Elite
              </h3>
              <p className="text-zinc-300 mt-2 max-w-2xl">
                Gabung untuk info event, update map, dan diskusi. Saran & kritik kalian berharga!
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/20 border border-indigo-400/40 px-4 py-2 text-sm hover:bg-indigo-500/30"
              >
                <ExternalLink className="w-4 h-4" /> Discord
              </a>
              <a
                href={ROBLOX_GROUP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-white/30"
              >
                <ArrowUpRight className="w-4 h-4" /> Roblox Group
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 p-6 bg-zinc-900/40">
            <h4 className="text-lg font-semibold">Tentang Kami</h4>
            <p className="text-zinc-300 mt-2">
              Indo Elite Studio adalah tim developer Roblox dari Indonesia yang fokus
              pada pengalaman mendaki gunung, obby, dan komunitas kompetitif.
              Kami mengutamakan performa, keadilan, dan keseruan bermain bareng.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 p-6 bg-zinc-900/40">
            <h4 className="text-lg font-semibold">Kolaborasi</h4>
            <p className="text-zinc-300 mt-2">
              Tertarik kolab? Kirimkan ide/portfolio melalui Discord.
              Kami terbuka untuk desain level, scripting, UI/UX, dan QA testing.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-8">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Indo Elite Studio. All rights reserved.</p>
          <a href="#" className="hover:text-white inline-flex items-center gap-1">
            Made with Indo Elite Studio
          </a>
        </div>
      </footer>
    </div>
  );
}
