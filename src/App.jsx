import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, FileText, Music2, Calculator, Trophy, FolderOpen, Volume2, User, Mail, Globe, HardDrive, HelpCircle } from 'lucide-react';
import iconDocument from "./assets/icons/Resume.png";
import iconCalculator from "./assets/icons/Calc.png";
import iconSolitaire from "./assets/icons/Solitaire.png";
import iconInternet from "./assets/icons/Internet.png";
import icondos from "./assets/icons/dos.png";
import iconcloud from "./assets/icons/cloud.png";

import { CONFIG } from './config';

const DESKTOP_BG = '#008080';

const desktopIcons = [
  { id: 'resume', label: 'Resume.doc', icon: iconDocument, x: 24, y: 28, scale: 1 },
  { id: 'certifications', label: 'Certifications', icon: iconcloud, x: 24, y: 112, scale: 2 },
  { id: 'calculator', label: 'Calculator', icon: iconCalculator, x: 24, y: 196, scale: 2 },
  { id: 'solitaire', label: 'Solitaire', icon: iconSolitaire, x: 24, y: 280, scale: 1 },
  { id: 'internet', label: 'Internet Explorer', icon: iconInternet, x: 24, y: 364, scale: 1 },
  { id: 'dos', label: 'Command Prompt', icon: icondos, x: 24, y: 448, scale: 1 },
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

function Button98({ children, className = '', onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px] border-t-white border-l-white border-r-[#404040] border-b-[#404040] shadow-[inset_1px_1px_0_#dfdfdf,inset_-1px_-1px_0_#808080] bg-[#c0c0c0] active:border-t-[#404040] active:border-l-[#404040] active:border-r-white active:border-b-white active:shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_#dfdfdf] px-2 py-1 select-none flex items-center justify-center gap-1 active:translate-x-[0.5px] active:translate-y-[0.5px]',
        active && 'border-t-[#404040] border-l-[#404040] border-r-white border-b-white shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_#dfdfdf]',
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
  onFocus,
  onDrag,
  isMaximized = false,
  isActive = true,
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
    if (!isMaximized) {
      setPosition({
        left: style?.left ?? position.left,
        top: style?.top ?? position.top,
      });
    }
  }, [style?.left, style?.top, isMaximized]);

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragRef.current.dragging || isMaximized) return;

      const nextPos = {
        left: e.clientX - dragRef.current.offsetX,
        top: e.clientY - dragRef.current.offsetY,
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
    if (e.target.closest('.window-controls')) return;
    
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
    <div
      className="absolute bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px] border-t-white border-l-white border-r-black border-b-black shadow-[inset_1px_1px_0_#dfdfdf,inset_-1px_-1px_0_#808080,1px_1px_0_#404040,-1px_-1px_0_#dfdfdf] p-1 flex flex-col"
      style={windowStyle}
      onMouseDown={() => onFocus?.()}
    >
      <div
        className={cn(
          "flex items-center justify-between px-2 py-[3px] select-none mb-1",
          isActive ? "bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#1084d0]" : "bg-gradient-to-r from-[#808080] to-[#dfdfdf]"
        )}
        onMouseDown={startDrag}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-4 h-4 flex-shrink-0 bg-[#c0c0c0] border border-white/50 shadow-sm flex items-center justify-center">
             <div className="w-2.5 h-2.5 bg-blue-800" />
          </div>
          <span className="text-white font-bold text-[13px] tracking-tight truncate drop-shadow-sm">
            {title}
          </span>
        </div>
        <div className="flex gap-[2px] window-controls">
          {onMinimize && (
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-r border-b-black shadow-[inset_1px_1px_0_#dfdfdf] flex items-center justify-center active:border-t-black active:border-l-black active:border-r-white active:border-b-white active:shadow-none active:translate-x-[0.5px] active:translate-y-[0.5px]"
            >
              <div className="w-[6px] h-[2px] bg-black mt-2" />
            </button>
          )}
          {onToggleMaximize && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggleMaximize(); }}
              className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-r border-b-black shadow-[inset_1px_1px_0_#dfdfdf] flex items-center justify-center active:border-t-black active:border-l-black active:border-r-white active:border-b-white active:shadow-none active:translate-x-[0.5px] active:translate-y-[0.5px]"
            >
              <div className="w-[8px] h-[8px] border-[1px] border-black border-t-[2px]" />
            </button>
          )}
          {onClose && (
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-r border-b-black shadow-[inset_1px_1px_0_#dfdfdf] flex items-center justify-center active:border-t-black active:border-l-black active:border-r-white active:border-b-white active:shadow-none active:translate-x-[0.5px] active:translate-y-[0.5px]"
            >
              <span className="text-black font-bold text-xs leading-none">×</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-[#c0c0c0] p-4 text-black text-[13px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

const WindowsLogo = () => (
  <div className="grid grid-cols-2 grid-rows-2 gap-[1px] w-[14px] h-[14px] rotate-[-2deg]">
    <div className="bg-[#ff4b00]" />
    <div className="bg-[#00c500]" />
    <div className="bg-[#00a6f3]" />
    <div className="bg-[#ffb400]" />
  </div>
);

function BootScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="h-screen w-screen bg-[#000000] text-white flex flex-col items-center justify-center font-serif select-none">
      <div className="w-[600px] max-w-[95vw] border-2 border-[#808080] p-8 bg-[#000000] shadow-[4px_4px_0_#404040]">
        <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col">
            <span className="text-5xl font-bold tracking-tighter leading-none italic">Windows <span className="text-blue-500">NT</span></span>
            <span className="text-xl tracking-[0.2em] font-light mt-1 uppercase">Server</span>
          </div>
          <div className="text-right text-xs opacity-70 italic font-sans">
            Version 4.0<br />
            Built on NT Technology
          </div>
        </div>

        <div className="space-y-2 font-sans text-sm">
          <div className="flex justify-between items-center h-6 border border-[#404040] p-[2px]">
             <motion.div
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 1.5, ease: "linear" }}
               className="h-full bg-blue-700 shadow-[0_0_10px_rgba(0,0,255,0.5)]"
             />          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-50 px-1">
            <span>Initializing...</span>
            <span>Please wait</span>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
           <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#808080] to-transparent opacity-20" />
        </div>
      </div>
      <div className="absolute bottom-8 text-[10px] opacity-30 font-sans tracking-widest uppercase">
        © 1985-1996 Microsoft Corporation
      </div>
    </div>
  );
}

function ResumeDoc({ resume }) {
  return (
    <div className="bg-white border border-black h-[70vh] text-black p-8 shadow-inner overflow-auto font-sans">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tighter uppercase">
          {resume.name} {resume.nickname ? `"${resume.nickname}"` : ''} {resume.surname}
        </h1>
        <p className="text-lg font-bold text-neutral-700 mt-1">{resume.title}</p>
        <div className="flex justify-center flex-wrap gap-4 mt-3 text-sm">
          {resume.email && (
            <>
              <span>{resume.email}</span>
              <span className="text-neutral-300">|</span>
            </>
          )}
          {resume.linkedin && (
            <>
              <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline font-bold">LinkedIn Profile</a>
              <span className="text-neutral-300">|</span>
            </>
          )}
          {resume.credly && (
            <>
              <a href={resume.credly} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline font-bold">Certification Badges</a>
              <span className="text-neutral-300">|</span>
            </>
          )}
          {resume.europassUrl && (
            <>
              <a href={resume.europassUrl} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline font-bold">Europass Profile</a>
              <span className="text-neutral-300">|</span>
            </>
          )}
          <a href={resume.cvPath} download="CV-Portfolio.pdf" className="text-blue-800 underline font-bold">Download PDF</a>
        </div>
      </div>

      {/* Experience Section */}
      <section className="mb-10">
        <div className="bg-[#000080] text-white px-3 py-1 text-sm font-bold uppercase mb-4 tracking-widest">
          Professional Experience
        </div>
        <div className="space-y-8">
          {resume.experience && resume.experience.map((exp, i) => (
            <div key={i} className="border-l-2 border-neutral-200 pl-4 relative">
              <div className="absolute w-3 h-3 bg-[#000080] -left-[7px] top-1.5 border border-white"></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-extrabold text-base uppercase">{exp.role}</h3>
                  <p className="text-sm font-bold text-neutral-600">{exp.company}</p>
                </div>
                <span className="bg-[#efefef] px-2 py-0.5 border border-neutral-300 text-[11px] font-mono font-bold">
                  {exp.years}
                </span>
              </div>
              <ul className="list-none space-y-2">
                {exp.bullets && exp.bullets.map((bullet, j) => (
                  <li key={j} className="text-sm leading-relaxed flex gap-2">
                    <span className="text-[#000080] font-bold">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-10">
        <div className="bg-[#000080] text-white px-3 py-1 text-sm font-bold uppercase mb-4 tracking-widest">
          Technical Skills & Stack
        </div>
        <div className="flex flex-wrap gap-2">
          {resume.skills && resume.skills.map((skill, i) => (
            <span key={i} className="border border-neutral-800 px-3 py-1 text-xs font-bold bg-[#f3f3f3] hover:bg-[#000080] hover:text-white transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <div className="bg-[#000080] text-white px-3 py-1 text-sm font-bold uppercase mb-4 tracking-widest">
          Education
        </div>
        <div className="p-4 border border-neutral-200 bg-[#fafafa]">
          <p className="text-sm font-bold italic">{resume.education}</p>
        </div>
      </section>
    </div>
  );
}

function CertificationsWindow({ certifications }) {
  return (
    <div className="bg-white border border-neutral-700 p-4 min-h-[320px] overflow-auto text-sm text-black">
      <div className="font-bold mb-4 text-lg border-b border-neutral-300 pb-2">Professional Certifications</div>
      <div className="space-y-4">
        {certifications.map((cert, i) => (
          <div key={i} className="border-l-4 border-[#000080] pl-3 py-1">
            <div className="font-bold text-base">{cert.name}</div>
            <div className="text-neutral-600">{cert.issuer} | {cert.year}</div>
            {cert.link && (
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline text-xs mt-1 block">
                Verify Credential
              </a>
            )}
          </div>
        ))}
        {certifications.length === 0 && <p className="text-neutral-500 italic">No certifications added yet.</p>}
      </div>
      <div className="mt-6 p-3 bg-[#f6f6f6] border border-neutral-400">
        <div className="font-bold mb-1 italic">Note:</div>
        <p className="text-xs">All certifications are verified and current. For digital badges, please follow the "Verify Credential" links.</p>
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
      <div className="bg-white border border-black text-right px-2 py-2 mb-2 font-mono text-xl h-12 overflow-hidden text-black">{display}</div>
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
      icon: Trophy,
      label: 'Certifications',
      action: 'certifications',
      description: 'View professional certifications and badges.',
    },
    {
      icon: HelpCircle,
      label: 'Why hire me?',
      action: 'whyhireme',
      description: 'A quick summary of what I bring to a team.',
    },
    {
      icon: Globe,
      label: 'Network Status',
      action: 'network',
      description: 'See the live hosting and delivery setup.',
    },
  ];

  return (
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[280px]">
      <div className="font-bold mb-2">My Computer</div>
      <p>Quick access to the most important parts of the portfolio.</p>

      <div className="grid grid-cols-2 gap-3 mt-4 text-black">
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
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[280px] overflow-auto text-black">
      <div className="font-bold mb-2">Why hire me?</div>

      <p className="mb-3">
        I bring a mix of hands-on systems experience, operational discipline,
        and curiosity for modern tooling. I have worked across Windows and Unix
        environments, access management, compliance-driven processes,
        troubleshooting, and technical support.
      </p>

      <ul className="list-disc pl-5 space-y-1">
        <li>Practical systems background in enterprise environments.</li>
        <li>Comfortable with Linux, Windows Server (NT to 2022), scripting, IAM, and networking.</li>
        <li>A builder mindset: focused on reliability, security, and maintainability.</li>
        <li>Strong fit for teams that value adaptability, ownership, and deep technical understanding.</li>
      </ul>
    </div>
  );
}

function NetworkStatusWindow() {
  const rows = [
    ['Hostname', 'winnt-server'],
    ['Deployment', 'Static Web Hosting'],
    ['Content Delivery', 'Global Edge Network'],
    ['Source Control', 'GitHub'],
    ['Status', 'Connected'],
    ['Latency', '~20ms'],
  ];

  return (
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[280px] overflow-auto text-black">
      <div className="font-bold mb-2">Network Configuration</div>

      <p className="mb-4">
        This panel summarizes the live hosting and delivery setup behind the portfolio.
      </p>

      <div className="grid grid-cols-[140px_1fr] border border-neutral-500">
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
    </div>
  );
}

function AboutWindow() {
  return (
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[220px] text-black">
      <div className="font-bold mb-2">About this portfolio</div>
      <p>This interactive portfolio recreates a Windows NT Server experience around my professional resume.</p>
      <p className="mt-3">Tip: Double-click desktop icons or use the Start menu to navigate.</p>
    </div>
  );
}
function CloudControlPanel() {
  const rows = [
    ['Frontend', 'React + Vite (Static Build)'],
    ['Hosting model', 'Decentralized Edge Delivery'],
    ['Asset Storage', 'Local Static Assets (No R2 Dependencies)'],
    ['Operations mindset', 'Zero-maintenance, high-availability architecture'],
    ['Security', 'Static delivery with minimal attack surface'],
  ];

  return (
    <div className="text-sm bg-white border border-neutral-700 p-4 min-h-[320px] overflow-auto text-black">
      <div className="font-bold mb-2">System Properties / Control Panel</div>

      <p className="mb-4">
        This portfolio is built as a fully static application, ensuring maximum compatibility,
        speed, and security without external cloud storage dependencies.
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
    </div>
  );
}

function DosPromptWindow() {
  const [history, setHistory] = useState([
    'Windows NT(R) Server Operating System',
    'Version 4.0 (Build 1381: Service Pack 6)',
    '',
    'C:\\> help',
    'Available commands: help, whoami, skills, certifications, projects, contact, systeminfo, ipconfig, clear',
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
      'Available commands: help, whoami, skills, certifications, projects, contact, systeminfo, ipconfig, clear'
    );
  } else if (command === 'whoami') {
    lines.push(`${CONFIG.name.toLowerCase()}.${CONFIG.surname.toLowerCase()}`);
    lines.push(`Role: ${CONFIG.title}`);
  } else if (command === 'skills') {
    lines.push(CONFIG.skills.join(', '));
  } else if (command === 'certifications') {
    CONFIG.certifications.forEach(c => lines.push(`${c.name} (${c.issuer})`));
  } else if (command === 'projects') {
    lines.push('Technical projects and infrastructure documentation.');
  } else if (command === 'contact') {
    if (CONFIG.email) lines.push(`Email: ${CONFIG.email}`);
    if (CONFIG.linkedin) lines.push(`LinkedIn: ${CONFIG.linkedin}`);
  } else if (command === 'systeminfo') {
    lines.push('Host Name:                 WINNT-SERVER');
    lines.push('OS Name:                   Windows NT Server');
    lines.push('Architecture:              React + Vite (Static)');
    lines.push('Frontend Framework:        React');
    lines.push('Status:                    Operational');
    } else if (command === 'ipconfig') {
    lines.push('Windows NT IP Configuration');
    lines.push('');
    lines.push('Ethernet adapter Portfolio NIC:');
    lines.push('   IP Address. . . . . . . . . . . : 10.0.0.1');
    lines.push('   Subnet Mask . . . . . . . . . . : 255.255.255.0');
    lines.push('   Default Gateway . . . . . . . . : 10.0.0.254');
  } else if (command === 'clear') {
    setHistory([]);
    return;
  } else {
    lines.push(`'${raw}' is not recognized as an internal or external command,`);
    lines.push('operable program or batch file.');
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

function StartMenu({ onOpen }) {
  const items = [
    { label: 'Programs', id: null, icon: '📁' },
    { label: 'Documents', id: 'resume', icon: '📄' },
    { label: 'Certifications', id: 'certifications', icon: '☁️' },
    { label: 'Calculator', id: 'calculator', icon: '🧮' },
    { label: 'Solitaire', id: 'solitaire', icon: '🃏' },
    { label: 'Internet Explorer', id: 'internet', icon: '🌐' },
    { label: 'Command Prompt', id: 'dos', icon: '💻' },
    { label: 'Control Panel', id: 'cloud', icon: '⚙️' },
    { label: 'Network Status', id: 'network', icon: '🔌' },
    { label: 'About This...', id: 'about', icon: 'ℹ️' },
    { label: 'Shut Down...', id: 'shutdown', icon: '🚪' },
  ];

  return (
    <div className="absolute bottom-[2px] left-0 w-[240px] bg-[#c0c0c0] border-t-[1px] border-l-[1px] border-r-[1px] border-b-[1px] border-t-white border-l-white border-r-black border-b-black shadow-[1px_1px_0_#404040,inset_1px_1px_0_#dfdfdf,inset_-1px_-1px_0_#808080] z-[60] flex">
      <div className="w-6 bg-[#808080] flex items-end justify-center pb-2 overflow-hidden border-r border-[#dfdfdf]">
        <span className="rotate-[-90deg] origin-center text-white font-bold text-lg tracking-widest whitespace-nowrap select-none opacity-50">
          Windows<span className="font-normal ml-1 text-sm italic">NT Server</span>
        </span>
      </div>
      <div className="flex-1 py-1">
        {items.map(({ label, id, icon }) => (
          <div key={label}>
            {label === 'Shut Down...' && <div className="h-[1px] bg-[#808080] border-b border-white my-1 mx-1" />}
            <button
              onClick={() => id && onOpen(id)}
              className="w-full text-left px-2 py-1 flex items-center gap-2 hover:bg-[#000080] hover:text-white group"
            >
              <span className="w-5 h-5 flex items-center justify-center text-lg">{icon}</span>
              <span className="text-xs font-medium">{label}</span>
            </button>
          </div>
        ))}
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
export default function WindowsNTServerPortfolio() {
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
  const resume = useMemo(() => CONFIG, []);

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
    certifications: { title: 'Certifications', left: 240, top: 110, width: 500 },
    calculator: { title: 'Calculator', left: 380, top: 160, width: 260 },
    solitaire: { title: 'Solitaire', left: 170, top: 72, width: 720 },
    portfolio: { title: 'My Computer', left: 250, top: 104, width: 430 },
    about: { title: 'About This...', left: 330, top: 170, width: 380 },
    internet: { title: 'Microsoft Internet Explorer', left: 280, top: 150, width: 520 },
    dos: { title: 'Command Prompt', left: 220, top: 120, width: 620 },
    cloud: { title: 'System Properties / Control Panel', left: 260, top: 120, width: 720 },
    whyhireme: { title: 'Why hire me? - Notepad', left: 260, top: 150, width: 560 },
    network: { title: 'Network Status', left: 280, top: 140, width: 620 },
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
    isMaximized: false,
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
      It is now safe to turn off your server.
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
        {selectionBox && (
          <div
            className="absolute border border-[#000080] bg-[#0000ff]/20 pointer-events-none z-[100]"
            style={{
              left: selectionBox.left,
              top: selectionBox.top,
              width: selectionBox.width,
              height: selectionBox.height,
            }}
          />
        )}
        {desktopIcons.map((item) => (
          <button
            key={item.id}
            className="absolute flex flex-col items-center w-24 text-white text-xs z-20 group"
            style={{ left: item.x, top: item.y }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(item.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              openWindow(item.id);
            }}
          >
            <div className="w-8 h-8 flex items-center justify-center mb-1 overflow-visible relative">
              <img
                src={item.icon}
                alt={item.label}
                className={cn(
                  "w-8 h-8 pixelated",
                  selectedIcon === item.id ? "brightness-75 contrast-125" : ""
                )}
                draggable="false"
                style={{ transform: `scale(${item.scale || 1})` }}
              />
              {selectedIcon === item.id && (
                <div className="absolute inset-0 bg-[#000080] mix-blend-color opacity-30 pointer-events-none" />
              )}
            </div>
            <span
              className={cn(
                "px-1 text-center select-none mt-1",
                selectedIcon === item.id ? "bg-[#000080] text-white outline-[1px] outline-dotted outline-white/50" : "bg-transparent"
              )}
            >
              {item.label}
            </span>
          </button>
        ))}
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
                isActive={w.z === zTop}
>
            {w.type === 'welcome' && (
              <div className="space-y-4 text-sm text-black">
                <div className="text-lg font-bold">Welcome to Windows NT Server</div>
                <p>Professional resume and portfolio recreation. </p>
                <p>Feel free to check my Resume.doc, certifications or projects.</p>
                <p>You can also launch a Command Prompt to inspect system information.</p>
                <div className="flex gap-2 flex-wrap">
                  <Button98 onClick={() => openWindow('resume')}>Open Resume.doc</Button98>
                  <Button98 onClick={() => openWindow('certifications')}>View Certifications</Button98>
                  <Button98 onClick={() => openWindow('about')}>About this portfolio</Button98>
                </div>
              </div>
            )}
            {w.type === 'resume' && <ResumeDoc resume={CONFIG} />}
            {w.type === 'certifications' && <CertificationsWindow certifications={CONFIG.certifications} />}
            {w.type === 'calculator' && <Calculator98 />}
            {w.type === 'solitaire' && <Solitaire98 />}
            {w.type === 'portfolio' && <MyComputerWindow onOpen={openWindow} />}
            {w.type === 'about' && <AboutWindow />}
            {w.type === 'internet' && <InternetExplorerError onClose={() => closeWindow(w.id)} />}
            {w.type === 'dos' && <DosPromptWindow />}
            {w.type === 'cloud' && <CloudControlPanel />}
            {w.type === 'whyhireme' && <WhyHireMeWindow />}
            {w.type === 'network' && <NetworkStatusWindow />}
          </Window98>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-[1px] border-t-white shadow-[inset_0_1px_0_#dfdfdf,0_-1px_0_#808080] z-50 flex items-center px-[2px] py-[2px] gap-1 select-none">
        <div className="relative h-full flex items-center" onClick={(e) => e.stopPropagation()}>
          <Button98 
            onClick={() => setStartOpen((s) => !s)} 
            active={startOpen}
            className="h-[30px] px-2 font-bold flex items-center gap-1.5 min-w-[80px]"
          >
            <WindowsLogo />
            <span className="text-[13px] tracking-tight">Start</span>
          </Button98>
          {startOpen && <StartMenu onOpen={openWindow} />}
        </div>

        <div className="flex-1 h-full flex items-center gap-1 overflow-hidden">
          {windows.map((w) => (
            <Button98
              key={w.id}
              active={w.z === zTop && !w.minimized}
              onClick={() => {
                if (w.minimized) {
                  setWindows((prev) =>
                    prev.map((item) =>
                      item.id === w.id ? { ...item, minimized: false } : item
                    )
                  );
                  bringToFront(w.id);
                } else if (w.z === zTop) {
                  minimizeWindow(w.id);
                } else {
                  bringToFront(w.id);
                }
              }}
              className="h-[28px] min-w-[80px] max-w-[160px] truncate text-left px-1 flex justify-start gap-1"
            >
              <div className="w-4 h-4 flex-shrink-0 bg-blue-800 border border-white/20" />
              <span className="text-xs truncate">{w.title}</span>
            </Button98>
          ))}
        </div>

        <div className="h-[28px] px-2 border-t border-l border-[#808080] border-r border-b border-white shadow-[inset_1px_1px_0_#404040,inset_-1px_-1px_0_#dfdfdf] flex items-center gap-2 text-[11px] text-black bg-[#c0c0c0]">
          <Volume2 className="w-3 h-3 opacity-70" />
          {clock}
        </div>
      </div>
    </div>
  );
}
