import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, FileText, Music2, Calculator, Trophy, FolderOpen, Volume2, User, Mail, Globe, HardDrive, HelpCircle } from 'lucide-react';
import iconComputer from "./assets/icons/MyPC.png";
import iconDocument from "./assets/icons/Resume.png";
import iconWinamp from "./assets/icons/Winamp.png";
import iconCalculator from "./assets/icons/Calc.png";
import iconSolitaire from "./assets/icons/Solitaire.png";
import iconFolder from "./assets/icons/Projects.png";
import iconInternet from "./assets/icons/Internet.png";
import icondos from "./assets/icons/dos.png";
import iconcloud from "./assets/icons/cloud.png";

const DESKTOP_BG = '#008080';
const BUCKET_BASE_URL = 'https://pub-ebff3b7bf9d8453fb0a174b49799e120.r2.dev';
const PLAYLIST_URL = `${BUCKET_BASE_URL}/playlist.m3u`;

const songsSeed = [
  { title: 'Raindrops', artist: 'Matias Menarguez', src: `${BUCKET_BASE_URL}/Matias%20Menarguez%20-%20Raindrops.mp3` },
  { title: 'Hacking', artist: 'Matias Menarguez', src: `${BUCKET_BASE_URL}/Matias%20Menarguez%20-%20Hacking.mp3` },
  { title: 'Away', artist: 'Matias Menarguez', src: `${BUCKET_BASE_URL}/Matias%20Menarguez%20-%20Away.mp3` },
  { title: 'Overcome', artist: 'Matias Menarguez', src: `${BUCKET_BASE_URL}/Matias%20Menarguez%20-%20Overcome.mp3` },
  { title: 'Farewell', artist: 'Matias Menarguez', src: `${BUCKET_BASE_URL}/Matias%20Menarguez%20-%20Farewell.mp3` },
  { title: 'Layers', artist: 'Matias Menarguez', src: `${BUCKET_BASE_URL}/Matias%20Menarguez%20-%20Layers.mp3` },
  { title: 'Red', artist: 'Matias Menarguez', src: `${BUCKET_BASE_URL}/Matias%20Menarguez%20-%20Red.mp3` },
];

const resumeSeed = {
  name: 'Matias Sebastian Menarguez Insua',
  title: 'IT Professional | Systems Administration | Security Compliance | Risk Management',
  location: 'Mt. Olive, New Jersey, USA',
  phone: '+1 (551) 235-7682',
  email: 'matumenar@gmail.com',
  website: 'www.linkedin.com/in/matiasmenarguez84',
  summary:
    'Results-oriented IT professional with over a decade of experience in system administration, security compliance, and risk management across enterprise environments. Proven success delivering robust technical support, enforcing GRC controls, and automating infrastructure tasks in hybrid environments. Adept at audit preparation, identity and access governance, and technical troubleshooting. Seeking to leverage hands-on experience and enterprise insight in an IT role.',
  experience: [
    {
      role: 'Freelance IT Consultant',
      company: 'USA / Argentina',
      years: '2013 – Present',
      bullets: [
        'Configured and secured Linux, MacOS, and Windows systems for SMB clients.',
        'Deployed and maintained WordPress websites with SEO, performance, and security optimizations.',
        'Automated backup, patching, and user access tasks via scripting.',
        'Provided support for remote work environments (VPN, router/firewall settings).',
        'Networking configuration and support for small companies.',
        'Advised on basic risk controls, GDPR-aligned practices, and asset documentation.',
        'Developed a Unity-based 2D adventure game showcasing modern platform fluency.',
      ],
    },
    {
      role: 'Enterprise Content Senior Administrator',
      company: 'Thomson Reuters',
      years: '2012 – 2013',
      bullets: [
        'Supported enterprise-level applications in a Unix/Solaris production environment.',
        'Administered Oracle/PLSQL scripts and databases, resolved real-time incidents.',
        'Managed backup routines and job automation using Tivoli and TSM.',
      ],
    },
    {
      role: 'S&RM Governance Analyst',
      company: 'IBM Global Delivery Center',
      years: '2010 – 2012',
      bullets: [
        'Executed system access audits, compliance revalidation and control documentation.',
        'Ensured adherence to IT governance for Ameriprise Financial’s infrastructure.',
        'Coordinated multi-region teams in incident response.',
      ],
    },
    {
      role: 'Team Coordinator',
      company: 'IBM Global Delivery Center',
      years: '2009 – 2010',
      bullets: [
        'Supervised 30+ administrators handling Windows/Unix environments.',
        'Delegated workloads, trained new hires, and upheld audit readiness.',
      ],
    },
    {
      role: 'Windows & Unix ID Administrator',
      company: 'IBM Global Delivery Center',
      years: '2006 – 2009',
      bullets: [
        'Managed Active Directory and Unix account lifecycle (create/update/revoke).',
        'Automated admin processes via Unix shell scripting.',
        'Troubleshooting in Windows and Unix systems.',
        'Supported enterprise clients including Phillip Morris, Novartis, and Ameriprise.',
      ],
    },
  ],
  skills: [
    'Risk Management & Governance',
    'SOX / GDPR basics',
    'Linux (Ubuntu, Red Hat, AIX)',
    'Windows Server (2003–2019)',
    'Active Directory',
    'IAM',
    'AWS Cloud Practitioner',
    'VMware',
    'Hyper-V',
    'Bash',
    'PowerShell',
    'TCP/IP',
    'VPNs',
    'DNS',
    'DHCP',
    'Firewall Configuration',
    'Tivoli Workload Scheduler',
    'Veritas Cluster',
    'TSM',
    'Oracle',
    'PL/SQL',
    'HP SM',
    'Technical Documentation',
    'Training & Onboarding',
    'Access Lifecycle Management',
  ],
  certifications: [
    'AWS Cloud Practitioner Essentials – Amazon Web Services',
    'Unix AIX Q1313',
    'Windows MOC 2273',
    'IT Essentials (Cisco)',
    'SSCP – Systems Security Certified Practitioner (in progress)',
  ],
  education: 'Escuela de Música de Buenos Aires — Professional Musician, 2006 | Colegio Leonardo Da Vinci — Bachelor\'s in Business Administration, 2002',
  languages: ['Spanish: Native', 'English: Fluent'],
};

const desktopIcons = [
  { id: 'resume', label: 'Resume.doc', icon: iconDocument, x: 24, y: 28, scale: 1 },
  { id: 'winamp', label: 'MatiAmp', icon: iconWinamp, x: 24, y: 112, scale: 2 },
  { id: 'calculator', label: 'Calculator', icon: iconCalculator, x: 24, y: 196, scale: 2 },
  { id: 'solitaire', label: 'Solitaire', icon: iconSolitaire, x: 24, y: 280, scale: 1 },
  { id: 'portfolio', label: 'My Computer', icon: iconComputer, x: 24, y: 364, scale: 1 },
  { id: 'projects', label: 'Projects', icon: iconFolder, x: 24, y: 448, scale: 1 },
  { id: 'internet', label: 'Internet Explorer', icon: iconInternet, x: 24, y: 532, scale: 1 },
  { id: 'dos', label: 'MS-DOS', icon: icondos, x: 24, y: 616, scale: 1 },
  { id: 'cloud', label: 'Cloud Control', icon: iconcloud, x: 24, y: 700, scale: 2 },
];

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
function rectsIntersect(a, b) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

function Button98({ children, className = '', onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px] border-t-white border-l-white border-r-neutral-700 border-b-neutral-700 bg-[#c0c0c0] active:border-t-neutral-700 active:border-l-neutral-700 active:border-r-white active:border-b-white px-2 py-1',
        className,
      )}
    >
      {children}
    </button>
  );
}

  function Window98({
  title,
  children,
  onClose,
  onMinimize,
  onToggleMaximize,
  style,
  zIndex = 10,
  controls = true,
  onFocus,
  onDrag,
  isMaximized = false,
}) {
  const [position, setPosition] = useState({
    left: style?.left ?? 0,
    top: style?.top ?? 0,
  });

  const dragRef = useRef({
    dragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    setPosition({
      left: style?.left ?? 0,
      top: style?.top ?? 0,
    });
  }, [style?.left, style?.top]);

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragRef.current.dragging || isMaximized) return;

      const nextPos = {
        left: Math.max(0, e.clientX - dragRef.current.offsetX),
        top: Math.max(0, e.clientY - dragRef.current.offsetY),
      };

      setPosition(nextPos);
      onDrag?.(nextPos);
    };

    const handleUp = () => {
      dragRef.current.dragging = false;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [onDrag, isMaximized]);

  const startDrag = (e) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();

    dragRef.current = {
      dragging: true,
      offsetX: e.clientX - position.left,
      offsetY: e.clientY - position.top,
    };

    onFocus?.();
  };

  const windowStyle = isMaximized
    ? {
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)',
        zIndex,
      }
    : {
        left: position.left,
        top: position.top,
        width: style?.width ?? 560,
        zIndex,
      };

  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.98, opacity: 0 }}
      transition={{ duration: 0.14 }}
      className="absolute shadow-xl border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px] border-t-white border-l-white border-r-neutral-700 border-b-neutral-700 bg-[#c0c0c0] flex flex-col"
      style={windowStyle}
      onMouseDown={() => onFocus?.()}
    >
      <div
        className={`flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 select-none ${isMaximized ? 'cursor-default' : 'cursor-move'}`}
        onMouseDown={startDrag}
      >
        <div className="font-bold text-sm tracking-tight truncate">{title}</div>

        {controls && (
          <div className="flex gap-1 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
            <button
              onClick={onMinimize}
              className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-black text-black text-[10px] flex items-center justify-center"
            >
              _
            </button>

            <button
              onClick={onToggleMaximize}
              className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-black text-black text-[10px] flex items-center justify-center"
            >
              {isMaximized ? '❐' : '□'}
            </button>

            <button
              onClick={onClose}
              className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-black text-black text-[10px] leading-none flex items-center justify-center"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="p-2 flex-1 min-h-0 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

function BootScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center font-mono">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-[720px] max-w-[92vw]">
        <div className="text-5xl font-bold tracking-tight mb-4">
          <span className="text-red-500">M</span>
          <span className="text-green-500">at</span>
          <span className="text-blue-400">ia</span>
          <span className="text-yellow-400">s</span>
          <span className="ml-4 text-white">Menarguez</span>
          <span className="align-super text-2xl ml-1">OS</span>
        </div>
        <div className="border border-neutral-500 p-1 bg-black">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.6, ease: 'linear' }}
            className="h-5 bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#54c7ff]"
          />
        </div>
        <div className="mt-8 text-sm text-neutral-300 leading-6">
          <div>Starting Matias Menarguez OS…</div>
          <div>Loading some simple but rather cool stuff…</div>
          <div>Initializing MatiAmp</div>
          <div>Mounting Resume.doc…</div>
        </div>
      </motion.div>
    </div>
  );
}

function ResumeDoc({ resume }) {
  return (
    <div className="bg-white border border-black h-[70vh] text-black p-8 text-[14px] leading-6 shadow-inner overflow-auto">
      <div className="text-center border-b border-neutral-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold">{resume.name}</h1>
        <p className="text-base">{resume.title}</p>
        <p className="text-sm">{resume.location} • {resume.phone} • {resume.email} • {resume.website}</p>
      </div>

      <section className="mb-6">
        <h2 className="font-bold text-lg uppercase mb-2">Profile</h2>
        <p>{resume.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-lg uppercase mb-2">Experience</h2>
        <div className="space-y-4">
          {resume.experience.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between gap-4">
                <div>
                  <div className="font-bold">{item.role}</div>
                  <div>{item.company}</div>
                </div>
                <div className="shrink-0">{item.years}</div>
              </div>
              <ul className="list-disc pl-6 mt-1">
                {item.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-lg uppercase mb-2">Skills</h2>
        <p>{resume.skills.join(' • ')}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-lg uppercase mb-2">Certifications</h2>
        <ul className="list-disc pl-6 mt-1">
          {resume.certifications.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-lg uppercase mb-2">Education</h2>
        <p>{resume.education}</p>
      </section>

      <section>
        <h2 className="font-bold text-lg uppercase mb-2">Languages</h2>
        <p>{resume.languages.join(' • ')}</p>
      </section>
    </div>
  );
}

function parseM3U(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (line.startsWith('#EXTINF:')) {
      const info = line.split(',')[1] || 'Unknown Artist - Untitled';
      const nextLine = lines[i + 1];

      if (nextLine && !nextLine.startsWith('#')) {
        const parts = info.split(' - ');
        const artist = parts.length > 1 ? parts[0].trim() : 'Matias Menarguez';
        const title = parts.length > 1 ? parts.slice(1).join(' - ').trim() : info.trim();

        parsed.push({
          artist,
          title,
          src: nextLine,
        });

        i += 1;
      }
    }
  }

  return parsed;
}

function Winamp98({ songs }) {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playlistSongs, setPlaylistSongs] = useState(songs);
  const [playlistStatus, setPlaylistStatus] = useState('Loading playlist...');
  const current = playlistSongs[index];

  useEffect(() => {
    let active = true;

    async function loadPlaylist() {
      try {
        const response = await fetch(PLAYLIST_URL, { cache: 'no-store' });
        if (!response.ok) throw new Error('Playlist request failed');
        const text = await response.text();
        const parsed = parseM3U(text);

        if (active && parsed.length > 0) {
          setPlaylistSongs(parsed);
          setPlaylistStatus('Playlist loaded');
          setIndex(0);
        } else if (active) {
          setPlaylistStatus('playlist.m3u is empty');
          setPlaylistSongs(songs);
        }
      } catch (error) {
        if (active) {
          setPlaylistSongs(songs);
          setPlaylistStatus('Fallback playlist loaded');
        }
      }
    }

    loadPlaylist();
    return () => {
      active = false;
    };
  }, [songs]);

  useEffect(() => {
    if (index > Math.max(playlistSongs.length - 1, 0)) {
      setIndex(0);
    }
  }, [playlistSongs, index]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing && current?.src) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing, current]);

  const toggle = () => setPlaying((p) => !p);
  const prev = () => setIndex((i) => (playlistSongs.length ? (i - 1 + playlistSongs.length) % playlistSongs.length : 0));
  const next = () => setIndex((i) => (playlistSongs.length ? (i + 1) % playlistSongs.length : 0));

  return (
    <div className="bg-[#bdbdbd] border border-black p-2 text-black">
      <audio ref={audioRef} src={current?.src || undefined} onEnded={next} />
      <div className="bg-black text-[#00ff66] p-2 font-mono text-sm mb-2 min-h-[86px]">
        <div>*** MATIAMP ***</div>
        <div className="mt-1">{current?.title || 'No track loaded'}</div>
        <div className="text-xs opacity-80">{current?.artist || 'Unknown Artist'}</div>
        <div className="mt-2 text-xs">{current?.src ? (playing ? 'Playing' : 'Paused') : playlistStatus}</div>
        <div className="text-[10px] opacity-70">{playlistStatus}</div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Button98 onClick={prev}>◀◀</Button98>
        <Button98 onClick={toggle}>{playing ? '❚❚' : '▶'}</Button98>
        <Button98 onClick={next}>▶▶</Button98>
        <div className="ml-auto text-xs px-2 py-1 bg-white border border-neutral-700">
          {playlistSongs.length ? `${index + 1}/${playlistSongs.length}` : '0/0'}
        </div>
      </div>

      <div className="bg-white border border-neutral-700 h-52 overflow-auto text-sm">
        {playlistSongs.map((song, i) => (
          <button
            key={`${song.title}-${i}`}
            onClick={() => {
              setIndex(i);
              setPlaying(true);
            }}
            className={cn(
              'w-full text-left px-2 py-1 border-b border-neutral-200',
              i === index ? 'bg-[#000080] text-white' : 'hover:bg-[#dfe8f6]'
            )}
          >
            {String(i + 1).padStart(2, '0')}  {song.artist} - {song.title}
          </button>
        ))}
      </div>
    </div>
  );
}

function Calculator98() {
  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState(null);
  const [op, setOp] = useState(null);

  const input = (v) => setDisplay((d) => (d === '0' ? String(v) : d + v));
  const clear = () => {
    setDisplay('0');
    setStored(null);
    setOp(null);
  };
  const setOperation = (nextOp) => {
    setStored(parseFloat(display));
    setDisplay('0');
    setOp(nextOp);
  };
  const equals = () => {
    if (stored === null || !op) return;
    const current = parseFloat(display);
    const result = op === '+' ? stored + current : op === '-' ? stored - current : op === '×' ? stored * current : current === 0 ? 'ERR' : stored / current;
    setDisplay(String(result));
    setStored(null);
    setOp(null);
  };
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '='];

  return (
    <div className="w-[220px]">
      <div className="bg-white border border-black text-right px-2 py-2 mb-2 font-mono text-xl h-12 overflow-hidden">{display}</div>
      <div className="grid grid-cols-4 gap-1">
        <Button98 onClick={clear}>C</Button98>
        <Button98 onClick={() => setOperation('+')}>+</Button98>
        <Button98 onClick={() => setOperation('-')}>-</Button98>
        <Button98 onClick={() => setOperation('×')}>×</Button98>
        {keys.map((k) => (
          <Button98 key={k} onClick={() => (k === '=' ? equals() : input(k))}>{k}</Button98>
        ))}
        <Button98 onClick={() => setOperation('÷')} className="col-span-4">÷</Button98>
      </div>
    </div>
  );
}

function createDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = [
    { rank: 1, label: 'A' },
    { rank: 2, label: '2' },
    { rank: 3, label: '3' },
    { rank: 4, label: '4' },
    { rank: 5, label: '5' },
    { rank: 6, label: '6' },
    { rank: 7, label: '7' },
    { rank: 8, label: '8' },
    { rank: 9, label: '9' },
    { rank: 10, label: '10' },
    { rank: 11, label: 'J' },
    { rank: 12, label: 'Q' },
    { rank: 13, label: 'K' },
  ];

  return suits.flatMap((suit) =>
    values.map(({ rank, label }) => ({
      id: `${label}${suit}`,
      suit,
      rank,
      label,
      color: suit === '♥' || suit === '♦' ? 'red' : 'black',
      faceUp: false,
    }))
  );
}

function shuffleCards(deck) {
  const copy = [...deck];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setupSolitaireGame() {
  const deck = shuffleCards(createDeck());
  const tableau = [];
  let cursor = 0;

  for (let col = 0; col < 7; col += 1) {
    const pile = [];
    for (let row = 0; row <= col; row += 1) {
      const card = { ...deck[cursor], faceUp: row === col };
      pile.push(card);
      cursor += 1;
    }
    tableau.push(pile);
  }

  return {
    stock: deck.slice(cursor).map((card) => ({ ...card, faceUp: false })),
    waste: [],
    foundations: { '♠': [], '♥': [], '♦': [], '♣': [] },
    tableau,
    selected: null,
    message: 'New game started',
  };
}

function cloneGame(game) {
  return {
    stock: game.stock.map((c) => ({ ...c })),
    waste: game.waste.map((c) => ({ ...c })),
    foundations: Object.fromEntries(Object.entries(game.foundations).map(([k, pile]) => [k, pile.map((c) => ({ ...c }))])),
    tableau: game.tableau.map((pile) => pile.map((c) => ({ ...c }))),
    selected: game.selected ? { ...game.selected } : null,
    message: game.message,
  };
}

function canPlaceOnFoundation(card, foundationPile) {
  if (!foundationPile.length) return card.rank === 1;
  const top = foundationPile[foundationPile.length - 1];
  return top.suit === card.suit && card.rank === top.rank + 1;
}

function canPlaceOnTableau(card, targetPile) {
  if (!targetPile.length) return card.rank === 13;
  const top = targetPile[targetPile.length - 1];
  if (!top.faceUp) return false;
  return card.color !== top.color && card.rank === top.rank - 1;
}

function getCardLabel(card) {
  return `${card.label}${card.suit}`;
}

function CardView({ card, selected, onClick, compact = false, placeholderLabel = '' }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-16 h-24 rounded-sm border text-left px-1 py-1 shadow',
        compact ? 'absolute left-0' : '',
        card
          ? card.faceUp
            ? 'border-black bg-white'
            : 'border-black bg-gradient-to-br from-[#000080] to-[#1084d0] text-white'
          : 'border border-dashed border-white/60 bg-[#008080] text-white flex items-center justify-center',
        selected ? 'outline outline-2 outline-yellow-300' : ''
      )}
    >
      {card ? (
        card.faceUp ? (
          <div className={cn('text-sm font-bold leading-4', card.color === 'red' ? 'text-red-600' : 'text-black')}>
            <div>{card.label}</div>
            <div>{card.suit}</div>
          </div>
        ) : (
          <div className="h-full w-full border border-white/70 flex items-center justify-center text-[10px] font-bold">
            WIN
          </div>
        )
      ) : (
        <div className="text-lg font-bold opacity-70">{placeholderLabel}</div>
      )}
    </button>
  );
}

function Solitaire98() {
  const [game, setGame] = useState(() => setupSolitaireGame());

  const resetGame = () => setGame(setupSolitaireGame());

  const clearSelection = (next, message = next.message) => {
    next.selected = null;
    next.message = message;
    return next;
  };

  const drawFromStock = () => {
    setGame((prev) => {
      const next = cloneGame(prev);

      if (next.stock.length) {
        const card = { ...next.stock.pop(), faceUp: true };
        next.waste.push(card);
        return clearSelection(next, `Drew ${getCardLabel(card)}`);
      }

      if (next.waste.length) {
        next.stock = next.waste.reverse().map((card) => ({ ...card, faceUp: false }));
        next.waste = [];
        return clearSelection(next, 'Recycled waste back into stock');
      }

      return prev;
    });
  };

  const selectWaste = () => {
    setGame((prev) => {
      if (!prev.waste.length) return prev;

      const topCard = prev.waste[prev.waste.length - 1];

      if (
        prev.selected &&
        prev.selected.zone === 'waste'
      ) {
        return {
          ...prev,
          selected: null,
          message: 'Selection cleared',
        };
      }

      return {
        ...prev,
        selected: {
          zone: 'waste',
          count: 1,
          card: topCard,
        },
        message: `Selected ${getCardLabel(topCard)}`,
      };
    });
  };

  const selectTableau = (pileIndex, cardIndex) => {
    setGame((prev) => {
      const next = cloneGame(prev);
      const pile = next.tableau[pileIndex];
      const card = pile[cardIndex];

      if (!card) return prev;

      if (!card.faceUp) {
        if (cardIndex === pile.length - 1) {
          pile[cardIndex].faceUp = true;
          next.selected = null;
          next.message = `Turned over ${getCardLabel(pile[cardIndex])}`;
          return next;
        }
        return prev;
      }

      const sameSelection =
        prev.selected &&
        prev.selected.zone === 'tableau' &&
        prev.selected.pileIndex === pileIndex &&
        prev.selected.cardIndex === cardIndex;

      if (sameSelection) {
        next.selected = null;
        next.message = 'Selection cleared';
        return next;
      }

      next.selected = {
        zone: 'tableau',
        pileIndex,
        cardIndex,
        count: pile.length - cardIndex,
        card,
      };
      next.message = `Selected ${getCardLabel(card)}`;
      return next;
    });
  };

  const moveToFoundation = (suit) => {
    setGame((prev) => {
      const next = cloneGame(prev);
      const sel = next.selected;
      if (!sel) return prev;

      const foundationPile = next.foundations[suit];
      let movingCard = null;

      if (sel.zone === 'waste') {
        movingCard = next.waste[next.waste.length - 1];
        if (!movingCard) return prev;

        if (!canPlaceOnFoundation(movingCard, foundationPile)) {
          return prev;
        }

        next.waste.pop();
      } else if (sel.zone === 'tableau') {
        if (sel.count !== 1) return prev;

        movingCard = next.tableau[sel.pileIndex][sel.cardIndex];
        if (!movingCard) return prev;

        if (!canPlaceOnFoundation(movingCard, foundationPile)) {
          return prev;
        }

        next.tableau[sel.pileIndex].pop();

        const reveal = next.tableau[sel.pileIndex][next.tableau[sel.pileIndex].length - 1];
        if (reveal && !reveal.faceUp) {
          reveal.faceUp = true;
        }
      } else {
        return prev;
      }

      next.foundations[suit].push(movingCard);
      return clearSelection(next, `Moved ${getCardLabel(movingCard)} to foundation`);
    });
  };

  const moveToTableau = (targetIndex) => {
    setGame((prev) => {
      const next = cloneGame(prev);
      const sel = next.selected;
      if (!sel) return prev;

      const targetPile = next.tableau[targetIndex];
      const movingCard = sel.card;

      if (!canPlaceOnTableau(movingCard, targetPile)) {
        return prev;
      }

      let movedCards = [];

      if (sel.zone === 'waste') {
        const wasteCard = next.waste[next.waste.length - 1];
        if (!wasteCard) return prev;
        movedCards = [next.waste.pop()];
      } else if (sel.zone === 'tableau') {
        if (sel.pileIndex === targetIndex) return prev;
        movedCards = next.tableau[sel.pileIndex].splice(sel.cardIndex);

        const reveal = next.tableau[sel.pileIndex][next.tableau[sel.pileIndex].length - 1];
        if (reveal && !reveal.faceUp) {
          reveal.faceUp = true;
        }
      } else {
        return prev;
      }

      next.tableau[targetIndex].push(...movedCards);
      return clearSelection(next, `Moved ${getCardLabel(movedCards[0])} to tableau`);
    });
  };

  const handleTableauCardClick = (pileIndex, cardIndex) => {
    const pile = game.tableau[pileIndex];
    const clickedCard = pile[cardIndex];
    if (!clickedCard) return;

    const selected = game.selected;

    if (!selected) {
      selectTableau(pileIndex, cardIndex);
      return;
    }

    const clickedIsSelected =
      selected.zone === 'tableau' &&
      selected.pileIndex === pileIndex &&
      selected.cardIndex === cardIndex;

    if (clickedIsSelected) {
      selectTableau(pileIndex, cardIndex);
      return;
    }

    if (selected.zone === 'waste') {
      if (canPlaceOnTableau(selected.card, pile)) {
        moveToTableau(pileIndex);
      } else {
        selectTableau(pileIndex, cardIndex);
      }
      return;
    }

    if (selected.zone === 'tableau') {
      if (selected.pileIndex !== pileIndex && canPlaceOnTableau(selected.card, pile)) {
        moveToTableau(pileIndex);
      } else {
        selectTableau(pileIndex, cardIndex);
      }
    }
  };

  const isSelectedTableauCard = (pileIndex, cardIndex) =>
    game.selected?.zone === 'tableau' &&
    game.selected?.pileIndex === pileIndex &&
    game.selected?.cardIndex === cardIndex;

  const isWon = Object.values(game.foundations).every((pile) => pile.length === 13);

  return (
    <div className="bg-[#008080] p-3 min-h-[480px] border border-black text-white text-sm">
      <div className="flex items-center justify-between mb-3 gap-3">
        <div className="font-bold">Klondike Solitaire</div>
        <div className="flex gap-2">
          <Button98 onClick={drawFromStock}>Draw</Button98>
          <Button98 onClick={() => setGame((prev) => ({ ...prev, selected: null, message: 'Selection cleared' }))}>
            Clear
          </Button98>
          <Button98 onClick={resetGame}>New Game</Button98>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex gap-3">
          <div>
            <div className="text-xs mb-1">Stock</div>
            <CardView
              card={game.stock.length ? { faceUp: false } : null}
              onClick={drawFromStock}
              placeholderLabel=""
            />
          </div>

          <div>
            <div className="text-xs mb-1">Waste</div>
            <CardView
              card={game.waste[game.waste.length - 1] || null}
              onClick={selectWaste}
              selected={game.selected?.zone === 'waste'}
              placeholderLabel=""
            />
          </div>
        </div>

        <div className="flex gap-3">
          {['♠', '♥', '♦', '♣'].map((suit) => {
            const pile = game.foundations[suit];
            const top = pile[pile.length - 1] || null;

            return (
              <div key={suit}>
                <div className="text-xs mb-1">{suit}</div>
                <CardView
                  card={top}
                  onClick={() => moveToFoundation(suit)}
                  placeholderLabel={suit}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 items-start">
        {game.tableau.map((pile, pileIndex) => (
          <div key={pileIndex}>
            <div className="text-xs mb-1">{pileIndex + 1}</div>
            <div className="relative min-h-[320px]">
              {pile.length === 0 && (
                <CardView
                  card={null}
                  onClick={() => moveToTableau(pileIndex)}
                  placeholderLabel=""
                />
              )}

              {pile.map((card, cardIndex) => (
                <div
                  key={card.id}
                  style={{ top: `${cardIndex * 24}px` }}
                  className="absolute left-0"
                >
                  <CardView
                    card={card}
                    compact
                    selected={isSelectedTableauCard(pileIndex, cardIndex)}
                    onClick={() => handleTableauCardClick(pileIndex, cardIndex)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs">
        <div>{isWon ? 'You won. Nice work.' : game.message}</div>
        <div>Click a card to select it, then click its destination.</div>
      </div>
    </div>
  );
}

function MyComputerWindow({ onOpen }) {
  const items = [
    {
      icon: FileText,
      label: 'Resume.doc',
      action: 'resume',
      description: 'Open my full resume in WordPad.',
    },
    {
      icon: FolderOpen,
      label: 'Projects',
      action: 'projects',
      description: 'View selected projects and technical work.',
    },
    {
      icon: HelpCircle,
      label: 'Why hire me?',
      action: 'whyhireme',
      description: 'A quick summary of what I bring to a team.',
    },
    {
      icon: HardDrive,
      label: 'Cloud Control',
      action: 'cloud',
      description: 'See hosting, storage, and deployment choices.',
    },
  ];

  return (
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[280px]">
      <div className="font-bold mb-2">My Computer</div>
      <p>Quick access to the most important parts of the portfolio.</p>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => onOpen(item.action)}
              className="border p-3 bg-[#efefef] flex items-start gap-3 text-left hover:bg-[#dfe8f6]"
            >
              <Icon className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold">{item.label}</div>
                <div className="text-xs mt-1">{item.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
function WhyHireMeWindow() {
  return (
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[280px] overflow-auto">
      <div className="font-bold mb-2">Why hire me?</div>

      <p className="mb-3">
        I bring a mix of hands-on systems experience, operational discipline,
        and curiosity for modern tooling. I have worked across Windows and Unix
        environments, access management, compliance-driven processes,
        troubleshooting, and technical support.
      </p>

      <ul className="list-disc pl-5 space-y-1">
        <li>Practical systems background in enterprise and freelance environments.</li>
        <li>Comfortable with Linux, Windows Server, basic scripting, IAM, networking, and support workflows.</li>
        <li>A builder mindset: this portfolio itself is a custom interactive project, not a template.</li>
        <li>Strong fit for teams that value adaptability, ownership, documentation, and learning speed.</li>
        <li>Growing cloud and AI interest grounded in real implementation, not hype.</li>
      </ul>
    </div>
  );
}
function ProjectsWindow({ onOpen }) {
  return (
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[280px]">
      <div className="font-bold mb-2">Projects Folder</div>
      <p>
        <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    onOpen('rotlt');
  }}
  className="text-blue-800 underline hover:text-red-700"
>
  ROTLT
</a>
        – This is an original Point & Click Adventure Game I developed under the alias R4cerX (with some help from AI)
        in C# + Phyton + Unity. It was created as a free WEB3 game, just for fun. Click "play as guest" to -hopefully- enjoy it.
        Pixel art was hand drawn in a collaboration with a Spanish artist/friend; story/puzzles/game design and music composing were all done by me.
      </p>

      <ul className="list-disc pl-5 mt-3 space-y-1">
        <li>Systems administration case studies</li>
        <li>Security and compliance project highlights</li>
        <li>Unity game and technical side projects</li>
        <li>Music releases and demos</li>
      </ul>
    </div>
  );
}

function AboutWindow() {
  return (
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[220px]">
      <div className="font-bold mb-2">About this portfolio</div>
      <p>This interactive portfolio recreates a Windows 98 desktop experience around Matias Menarguez's resume. And also denotes my age.</p>
      <p className="mt-3">Tip: double-click desktop icons, launch MatiAmp, and open Resume.doc.</p>
    </div>
  );
}
function CloudControlPanel() {
  const rows = [
    ['Frontend', 'React + Vite single-page app'],
    ['Hosting model', 'Static deployment optimized for simple maintenance'],
    ['Audio storage', 'Cloudflare R2 public bucket'],
    ['Playlist delivery', 'playlist.m3u loaded into MatiAmp at runtime'],
    ['Game integration', 'ROTLT loaded through an Internet Explorer iframe'],
    ['Operations mindset', 'Lightweight hosting, low moving parts, easy rollback'],
    ['Next upgrade', 'Serverless contact endpoint, logging, or monitoring panel'],
  ];

  return (
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[320px] overflow-auto">
      <div className="font-bold mb-2">System Properties / Cloud Control Panel</div>

      <p className="mb-4">
        This portfolio is intentionally built like a small operational system:
        static frontend delivery, cloud object storage for music assets, and
        browser-hosted project demos.
      </p>

      <div className="grid grid-cols-[150px_1fr] border border-neutral-500">
        {rows.map(([label, value], index) => (
          <React.Fragment key={label}>
            <div
              className={cn(
                'px-3 py-2 border-r border-b border-neutral-300 font-bold bg-[#efefef]',
                index === rows.length - 1 ? 'border-b-0' : ''
              )}
            >
              {label}
            </div>
            <div
              className={cn(
                'px-3 py-2 border-b border-neutral-300',
                index === rows.length - 1 ? 'border-b-0' : ''
              )}
            >
              {value}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-4 border border-neutral-400 bg-[#f6f6f6] p-3">
        <div className="font-bold mb-1">Why this matters</div>
        <p>
          For sysadmin and junior cloud/AI roles, the value here is practical
          deployment choices, maintainability, asset hosting, and operational thinking.
        </p>
      </div>
    </div>
  );
}

function DosPromptWindow() {
  const [history, setHistory] = useState([
    'Menarguez(R) Matias Menarguez OS',
    '(C)Copyright Menarguez Corp 1984-1998.',
    '',
    'C:\\> help',
    'Available commands: help, whoami, skills, cloud, ai, projects, contact, systeminfo, ipconfig, aws s3 ls, terraform plan, kubectl get pods, clear',
  ]);
  const [input, setInput] = useState('');
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (raw) => {
  const command = raw.trim().toLowerCase();
  if (!command) return;

  const lines = [`C:\\> ${raw}`];

  if (command === 'help') {
    lines.push(
      'Available commands: help, whoami, skills, cloud, ai, projects, contact, systeminfo, ipconfig, aws s3 ls, terraform plan, kubectl get pods, clear'
    );
  } else if (command === 'whoami') {
    lines.push('matias.menarguez');
    lines.push('Role focus: SysAdmin / Cloud Support / Junior AI Engineer');
  } else if (command === 'skills') {
    lines.push(
      'Linux, Windows Server, Active Directory, IAM, VMware, Hyper-V, Bash, PowerShell, TCP/IP, DNS, DHCP, Oracle, PL/SQL'
    );
  } else if (command === 'cloud') {
    lines.push('Frontend host: static web app');
    lines.push('Audio storage: Cloudflare R2');
    lines.push('Playlist delivery: public object storage');
    lines.push('Deployment mindset: lightweight, edge-friendly, low-maintenance');
  } else if (command === 'ai') {
    lines.push(
      'Current AI focus: practical engineering use-cases, automation, prompt workflows, and building tools with AI assistance.'
    );
    lines.push(
      'ROTLT was developed with Unity/C# plus selective AI-assisted workflow support.'
    );
  } else if (command === 'projects') {
    lines.push('ROTLT - Unity/C# point-and-click adventure game');
    lines.push('Matias Menarguez portfolio OS');
    lines.push('Freelance IT consulting and systems work');
  } else if (command === 'contact') {
    lines.push('Email: matumenar@gmail.com');
    lines.push('LinkedIn: www.linkedin.com/in/matiasmenarguez84');
  } else if (command === 'systeminfo') {
    lines.push('Host Name:                 MATIAS');
    lines.push('OS Name:                   Matias Menarguez OS Portfolio Edition');
    lines.push('OS Version:                4.10.1998 Build Portfolio');
    lines.push('System Manufacturer:       Custom Build');
    lines.push('System Model:              Browser Virtual Machine');
    lines.push('Processor(s):              1 Processor Installed');
    lines.push('                           [01]: JavaScript Runtime');
    lines.push('Memory:                    4 MB Retro RAM');
    lines.push('Domain:                    WORKGROUP');
  } else if (command === 'ipconfig') {
    lines.push('Matias Menarguez OS IP Configuration');
    lines.push('');
    lines.push('Ethernet adapter Portfolio NIC:');
    lines.push('   IP Address. . . . . . . . . . . : 192.168.98.84');
    lines.push('   Subnet Mask . . . . . . . . . . : 255.255.255.0');
    lines.push('   Default Gateway . . . . . . . . : 192.168.98.1');
    lines.push('   DNS Servers . . . . . . . . . . : 1.1.1.1');
  } else if (command === 'aws s3 ls') {
    lines.push('2026-03-10  19:45:00  portfolio-audio-r2');
    lines.push('2026-03-10  19:45:00  portfolio-static-assets');
    lines.push('Note: music assets are currently delivered through Cloudflare R2-compatible storage.');
  } else if (command === 'terraform plan') {
    lines.push('Refreshing Terraform state in-memory prior to plan...');
    lines.push('');
    lines.push('Plan:');
    lines.push('  + static_site');
    lines.push('  + object_storage_bucket');
    lines.push('  + dns_record');
    lines.push('');
    lines.push('No destructive changes. Infrastructure posture looks stable.');
  } else if (command === 'kubectl get pods') {
    lines.push('NAME                          READY   STATUS    RESTARTS   AGE');
    lines.push('portfolio-web-7f9c8d          1/1     Running   0          12d');
    lines.push('prompt-lab-56b4d2             1/1     Running   0          5d');
    lines.push('metrics-agent-2aa91f          1/1     Running   1          18d');
  } else if (command === 'clear') {
    setHistory([]);
    return;
  } else {
    lines.push(`Bad command or file name: ${raw}`);
    lines.push('Type HELP for available commands.');
  }

  setHistory((prev) => [...prev, ...lines]);
};

  return (
    <div className="bg-black text-[#c0c0c0] border border-black h-[420px] flex flex-col font-mono text-sm">
      <div ref={outputRef} className="flex-1 overflow-auto p-3 space-y-1">
        {history.map((line, index) => (
          <div key={index}>{line || '\u00A0'}</div>
        ))}
      </div>

      <form
        className="border-t border-neutral-700 p-2 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          runCommand(input);
          setInput('');
        }}
      >
        <span>C:\&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black text-[#c0c0c0] outline-none"
          autoFocus
        />
      </form>
    </div>
  );
}

function InternetExplorerError({ onClose }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-[#c0c0c0] text-black text-sm">
      <div className="border-t border-l border-white border-r border-b border-neutral-700 bg-[#c0c0c0] p-3">
        <div className="bg-white border border-neutral-700 p-4 min-h-[150px]">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 border border-black bg-yellow-300 flex items-center justify-center font-bold text-xl shrink-0">!</div>
            <div>
              <div className="font-bold mb-2">This program has performed an illegal operation and will be shut down.</div>
              <div>If the problem persists, contact the program vendor.</div>
              <div className="mt-3 font-mono text-xs bg-[#efefef] border border-neutral-400 p-2">
                IEXPLORE caused an invalid page fault in module KERNEL32.DLL at 017f:bff9dfff
              </div>
            </div>
          </div>

          {showDetails && (
            <div className="mt-4 border border-neutral-500 bg-[#f3f3f3] p-3 font-mono text-[11px] leading-5 whitespace-pre-wrap">
{`Registers:
EAX=00000000 CS=017f EIP=bff9dfff EFLGS=00010246
EBX=0068f4b8 SS=0187 ESP=0068f3c0 EBP=0068f3d8
ECX=00000000 DS=0187 ESI=00000000 FS=2fd7
EDX=0068f404 ES=0187 EDI=00000000 GS=0000
Bytes at CS:EIP:
8b 44 24 04 85 c0 74 12 8b 4c 24 08 89 01 33 c0
Stack dump:
0078ff10  bff76839  00000001  0068f404  00000000  0068f430`}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <Button98 onClick={onClose}>Close</Button98>
          <Button98 onClick={() => setShowDetails((v) => !v)}>
            {showDetails ? 'Hide Details' : 'Details'}
          </Button98>
        </div>
      </div>
    </div>
  );
}

function InternetExplorerWindow() {
  return (
    <div className="bg-white border border-neutral-700 h-full flex flex-col overflow-hidden">
      <div className="bg-[#c0c0c0] border-b border-neutral-600 px-2 py-1 text-xs">
        Address: https://leetskulls.xyz/games/raiders
      </div>

      <iframe
        src="https://leetskulls.xyz/games/raiders"
        className="flex-1 w-full h-full border-0"
        title="ROTLT"
      />
    </div>
  );
}

function StartMenu({ onOpen }) {
  const items = [
    { label: 'Programs', id: null },
    { label: 'Documents', id: 'resume' },
    { label: 'Music', id: 'winamp' },
    { label: 'Calculator', id: 'calculator' },
    { label: 'Solitaire', id: 'solitaire' },
    { label: 'Internet Explorer', id: 'internet' },
    { label: 'MS-DOS', id: 'dos' },
    { label: 'Cloud Control Panel', id: 'cloud' },
    { label: 'About This...', id: 'about' },
    { label: 'Shut Down...', id: 'shutdown' },
  ];

  return (
    <div className="absolute bottom-10 left-0 w-[280px] bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px] border-t-white border-l-white border-r-neutral-700 border-b-neutral-700 shadow-2xl">
      <div className="flex">
        <div className="relative w-10 bg-gradient-to-b from-[#808080] to-[#5a5a5a] text-white overflow-hidden">
  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] origin-center text-xs font-bold whitespace-nowrap">
    Matias 98
  </span>
</div>
        <div className="flex-1 p-1 text-sm">
          {items.map(({ label, id }) => (
            <button
              key={label}
              onClick={() => id && onOpen(id)}
              className="w-full text-left px-3 py-2 hover:bg-[#000080] hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
function centerWindow(width = 560, height = 320) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight - 40; // taskbar

  return {
    left: Math.max(20, Math.round((viewportWidth - width) / 2)),
    top: Math.max(20, Math.round((viewportHeight - height) / 2)),
  };
}
export default function Windows98ResumePortfolio() {
  const [booted, setBooted] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectionBox, setSelectionBox] = useState(null);
  const [selectionStart, setSelectionStart] = useState(null);
  const [shutdown, setShutdown] = useState(false);
  const welcomeStart = centerWindow(560, 260);
  
  const [windows, setWindows] = useState([
  {
    id: 'welcome',
    title: 'Welcome',
    type: 'welcome',
    left: welcomeStart.left,
    top: welcomeStart.top,
    z: 20,
    minimized: false,
    isMaximized: false,
  },
]);
const [zTop, setZTop] = useState(30);
  const songs = useMemo(() => songsSeed, []);
  const resume = useMemo(() => resumeSeed, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const bringToFront = (id) => {
    setZTop((z) => z + 1);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: zTop + 1 } : w)));
  };

  const openWindow = (type) => {
  setStartOpen(false);

  if (type === 'shutdown') {
  setShutdown(true);
  return;
}

  const existing = windows.find((w) => w.type === type);
  if (existing) {
    setWindows((prev) =>
      prev.map((w) => (w.id === existing.id ? { ...w, minimized: false } : w))
    );
    bringToFront(existing.id);
    return;
  }

  const config = {
    resume: { title: 'Resume.doc - WordPad', left: 120, top: 56, width: 860 },
    winamp: { title: 'MatiAmp', left: 240, top: 110, width: 380 },
    calculator: { title: 'Calculator', left: 380, top: 160, width: 260 },
    solitaire: { title: 'Solitaire', left: 170, top: 72, width: 720 },
    portfolio: { title: 'My Computer', left: 250, top: 104, width: 430 },
    projects: { title: 'Projects', left: 280, top: 132, width: 460 },
    about: { title: 'About This...', left: 330, top: 170, width: 380 },
    internet: { title: 'Microsoft Internet Explorer', left: 280, top: 150, width: 520 },
    rotlt: { title: 'Internet Explorer - ROTLT', left: 20, top: 20, width: 1200 },
    dos: { title: 'MS-DOS Prompt', left: 220, top: 120, width: 620 },
    cloud: { title: 'System Properties / Cloud Control Panel', left: 260, top: 120, width: 720 },
    whyhireme: { title: 'Why hire me? - Notepad', left: 260, top: 150, width: 560 },
  }[type];

  if (!config) return;

  setZTop((z) => z + 1);
  setWindows((prev) => [
  ...prev,
  {
    id: `${type}-${Date.now()}`,
    type,
    title: config.title,
    left: config.left,
    top: config.top,
    width: config.width,
    z: zTop + 1,
    minimized: false,
    isMaximized: type === 'rotlt',
  },
]);
};
const minimizeWindow = (id) => {
  setWindows((prev) =>
    prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
  );
};

const toggleMaximizeWindow = (id) => {
  setWindows((prev) =>
    prev.map((w) =>
      w.id === id
        ? { ...w, isMaximized: !w.isMaximized, minimized: false }
        : w
    )
  );
};

const updateWindowPosition = (id, pos) => {
  setWindows((prev) =>
    prev.map((w) => (w.id === id ? { ...w, left: pos.left, top: pos.top } : w))
  );
};
  const closeWindow = (id) => setWindows((prev) => prev.filter((w) => w.id !== id));
  if (shutdown) {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center text-orange-400 font-mono text-2xl">
      It is now safe to turn off your computer. Looking forward to hearing from you.
    </div>
  );
}
  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }
  const visibleWindows = windows.filter((w) => !w.minimized);
  return (
    <div
  className="h-screen w-screen overflow-hidden relative font-sans"
  style={{ backgroundColor: DESKTOP_BG }}
  onClick={() => {
    if (startOpen) setStartOpen(false);
    setSelectedIcon(null);
  }}
  onMouseDown={(e) => {
    if (e.target !== e.currentTarget) return;
    setSelectionStart({ x: e.clientX, y: e.clientY });
    setSelectionBox({ left: e.clientX, top: e.clientY, width: 0, height: 0 });
  }}
  onMouseMove={(e) => {
    if (!selectionStart) return;
    const left = Math.min(selectionStart.x, e.clientX);
    const top = Math.min(selectionStart.y, e.clientY);
    const width = Math.abs(e.clientX - selectionStart.x);
    const height = Math.abs(e.clientY - selectionStart.y);
    setSelectionBox({ left, top, width, height });
  }}
  onMouseUp={() => {
    if (!selectionBox) {
      setSelectionStart(null);
      return;
    }

    const selectionRect = {
      left: selectionBox.left,
      top: selectionBox.top,
      right: selectionBox.left + selectionBox.width,
      bottom: selectionBox.top + selectionBox.height,
    };

    const selected = desktopIcons
      .filter((item) => {
        const rect = {
          left: item.x,
          top: item.y,
          right: item.x + 96,
          bottom: item.y + 72,
        };
        return rectsIntersect(selectionRect, rect);
      })
      .map((item) => item.id);

    setSelectedIcon(selected.length ? selected[0] : null);
    setSelectionStart(null);
    setSelectionBox(null);
  }}
>
      <div className="absolute inset-0 z-10">
   {desktopIcons.map((item) => {
    {selectionBox && (
  <div
    className="absolute border border-[#000080] bg-[#0000ff]/20 pointer-events-none"
    style={{
      left: selectionBox.left,
      top: selectionBox.top,
      width: selectionBox.width,
      height: selectionBox.height,
    }}
  />
)}
  return (
    <button
  key={item.id}
  className="absolute flex flex-col items-center w-24 text-white text-xs"
  style={{ left: item.x, top: item.y }}
  onClick={(e) => {
    e.stopPropagation();
    setSelectedIcon(item.id);
  }}
  onDoubleClick={(e) => {
    e.stopPropagation();
    openWindow(item.id)
    ;
    
  }}
>
      <div className="w-8 h-8 flex items-center justify-center mb-1 overflow-visible">
  <img
    src={item.icon}
    alt={item.label}
    className="w-8 h-8 pixelated drop-shadow"
    draggable="false"
    style={{ transform: `scale(${item.scale || 1})` }}
  />
</div>
      <span
  className={`px-1 text-center ${
    selectedIcon === item.id
      ? "bg-[#000080] text-white"
      : "bg-transparent"
  }`}
>
        {item.label}
      </span>
    </button>
  );
})}
      </div>

      <AnimatePresence>
        {visibleWindows.map((w) => (
         <Window98
                key={w.id}
                title={w.title}
                zIndex={w.z}
                onClose={() => closeWindow(w.id)}
                onMinimize={() => minimizeWindow(w.id)}
                onToggleMaximize={() => toggleMaximizeWindow(w.id)}
                onFocus={() => bringToFront(w.id)}
                onDrag={(pos) => updateWindowPosition(w.id, pos)}
                style={{ left: w.left, top: w.top, width: w.width || 560 }}
                isMaximized={w.isMaximized}
>
            {w.type === 'welcome' && (
              <div className="space-y-4 text-sm">
                <div className="text-lg font-bold">Welcome to Matias Menarguez OS</div>
                <p>This interactive portfolio might seem familiar... but no copyright has been infringed -I hope-. </p>
                <p>Feel free to check my Resume.doc, play some solitaire or ROTLT and listen to some of my music while doing so.</p>
                <p>You can also launch an MS-DOS prompt to inspect cloud, AI, and systems-oriented commands.</p>
                <div className="flex gap-2 flex-wrap">
                  <Button98 onClick={() => openWindow('resume')}>Open Resume.doc</Button98>
                  <Button98 onClick={() => openWindow('winamp')}>Launch MatiAmp</Button98>
                  <Button98 onClick={() => openWindow('about')}>About this portfolio</Button98>
                </div>
              </div>
            )}
            {w.type === 'resume' && <ResumeDoc resume={resume} />}
            {w.type === 'winamp' && <Winamp98 songs={songs} />}
            {w.type === 'calculator' && <Calculator98 />}
            {w.type === 'solitaire' && <Solitaire98 />}
            {w.type === 'portfolio' && <MyComputerWindow onOpen={openWindow} />}
            {w.type === 'projects' && <ProjectsWindow onOpen={openWindow} />}
            {w.type === 'about' && <AboutWindow />}
            {w.type === 'internet' && <InternetExplorerError onClose={() => closeWindow(w.id)} />}
            {w.type === 'rotlt' && <InternetExplorerWindow />}
            {w.type === 'dos' && <DosPromptWindow />}
            {w.type === 'cloud' && <CloudControlPanel />}
            {w.type === 'whyhireme' && <WhyHireMeWindow />}
          </Window98>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-[2px] border-t-white z-50 flex items-center px-1">
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <Button98 onClick={() => setStartOpen((s) => !s)} className="h-8 min-w-[90px] font-bold flex items-center gap-2">
            <div className="w-4 h-4 bg-[#1084d0] rounded-sm" />
            Start
          </Button98>
          {startOpen && <StartMenu onOpen={openWindow} />}
        </div>

        <div className="ml-2 flex-1 h-8 flex items-center gap-1 overflow-hidden">
  {windows.map((w) => (
    <Button98
      key={w.id}
      onClick={() => {
        if (w.minimized) {
          setWindows((prev) =>
            prev.map((item) =>
              item.id === w.id ? { ...item, minimized: false } : item
            )
          );
          bringToFront(w.id);
        } else {
          minimizeWindow(w.id);
        }
      }}
      className="h-8 min-w-[120px] max-w-[180px] truncate text-left"
    >
      {w.title}
    </Button98>
  ))}
</div>

        <div className="ml-2 h-8 px-3 border-t border-l border-neutral-700 border-r border-b border-white bg-[#c0c0c0] flex items-center gap-2 text-sm">
          <Volume2 className="w-4 h-4" />
          {clock}
        </div>
      </div>
    </div>
  );
}
