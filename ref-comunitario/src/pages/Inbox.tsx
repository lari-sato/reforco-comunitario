import call from "../assets/icons/call.svg";
import play from "../assets/icons/play.svg";
import { useMemo, useState } from "react";

type Message = {
  id: number;
  title: string;
  timeLabel: string;
  kind: "call" | "play";
};

const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function formatLabel(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const w = week[d.getDay()];
  return `${w} ${dd}/${mm} • ${hh}h`;
}

function generateBatch(startId: number, count: number): Message[] {
  const base = new Date(2025, 9, 20, 8);
  return Array.from({ length: count }, (_, i) => {
    const idx = startId + i;
    const d = new Date(base);
    d.setDate(base.getDate() + idx);
    d.setHours(8 + (idx % 10));
    return {
      id: idx,
      title: `SOLICITAÇÃO #${idx}`,
      timeLabel: formatLabel(d),
      kind: idx % 2 === 0 ? "call" : "play",
    };
  });
}

export const Inbox = () => {
  const [messages, setMessages] = useState<Message[]>(() => generateBatch(1, 10));

  const loadMore = () => {
    const nextId = messages.length + 1;
    setMessages((prev) => [...prev, ...generateBatch(nextId, 5)]);
  };

  const handleClick = (m: Message) => {
    console.log("Open:", m.id);
  };

  const items = useMemo(() => messages, [messages]);

  return (
    <div className="inbox-content">
      <h1 className="title">Solicitações</h1>

      <div className="list">
        {items.map((m, index) => {
          const iconSrc = index % 2 === 0 ? call : play;
          return (
            <button
              key={m.id}
              type="button"
              className={`row ${index % 2 === 0 ? "alt-a" : "alt-b"}`}
              onClick={() => handleClick(m)}
            >
              <div className="icon">
                <img className="icon-img" src={iconSrc} alt="" aria-hidden />
              </div>

              <span className="text">{m.title}</span>
              <span className="time">{m.timeLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="list-action">
        <button type="button" className="btn-load" onClick={loadMore}>
          Carregar mais
        </button>
      </div>
    </div>
  );
};
