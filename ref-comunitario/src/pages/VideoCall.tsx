import { useEffect, useMemo, useRef, useState } from "react";
import SimplePeer, { type SignalData } from "simple-peer";

type PeerInstance = SimplePeer.Instance;

export const ConnState = {
  IDLE: "IDLE",
  OFFERING: "OFFERING",
  RECEIVING: "RECEIVING",
  CONNECTED: "CONNECTED",
} as const;

export type ConnState = typeof ConnState[keyof typeof ConnState];

export function VideoCall() {
  const wsRef = useRef<WebSocket | null>(null);
  const selfVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<PeerInstance | null>(null);
  const [state, setState] = useState<ConnState>(ConnState.IDLE);
  const [offerSignal, setOfferSignal] = useState<SignalData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const WS_URL = useMemo(
    () => import.meta.env.VITE_WS_URL || "ws://localhost:8080/videochat",
    []
  );

  // abre conexão WS de sinalização
  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      // ok
    };

    ws.onerror = () => {
      setError("Falha ao conectar ao servidor de sinalização.");
    };

    ws.onmessage = (ev) => {
      const payload: any = safeParse(ev.data);
      if (!payload) return;

      // segue a lógica do post: se receber "offer" vira RECEIVING; se "answer", sinaliza no peer
      if (payload.type === "offer") {
        setOfferSignal(payload);
        setState(ConnState.RECEIVING);
      } else if (payload.type === "answer") {
        peerRef.current?.signal(payload);
      } else if (payload.type === "candidate") {
        // se usar trickle:true e quiser repassar ICE manualmente (aqui estamos com trickle:false por padrão)
        peerRef.current?.signal(payload);
      }
    };

    return () => {
      try { ws.close(); } catch {}
      wsRef.current = null;
    };
  }, [WS_URL]);

  function safeParse(data: any) {
    try { return JSON.parse(data); } catch { return null; }
  }

  async function start(isInitiator: boolean, incomingOffer?: SignalData) {
    setError(null);

    // captura mídia local
    const media = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true, // habilite áudio na chamada
    });

    // exibe vídeo local
    if (selfVideoRef.current) {
      selfVideoRef.current.srcObject = media;
      // evitar autoplay bloqueado: muted para self
      selfVideoRef.current.muted = true;
      await selfVideoRef.current.play().catch(() => {});
    }

    // cria peer
    const sp = new SimplePeer({
      initiator: isInitiator,
      trickle: false, // ofertas/answers únicas, simplifica o sinal
      stream: media,
      // se for publicar, configure STUN/TURN aqui:
      // config: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }
    });

    // se for responder, injeta a offer recebida
    if (!isInitiator && incomingOffer) {
      sp.signal(incomingOffer);
    }

    // quando o peer gerar um sinal (offer/answer), envie no WS
    sp.on("signal", (data: SignalData) => {
      wsRef.current?.send(JSON.stringify(data));
    });

    sp.on("connect", () => setState(ConnState.CONNECTED));

    sp.on("stream", async (remote: MediaStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remote;
        await remoteVideoRef.current.play().catch(() => {});
      }
    });

    sp.on("error", (e) => {
      setError(`Erro na conexão P2P: ${e?.message ?? e}`);
    });

    sp.on("close", () => {
      cleanupPeer();
      setState(ConnState.IDLE);
    });

    peerRef.current = sp;
    setState(isInitiator ? ConnState.OFFERING : ConnState.RECEIVING);
  }

  function answer() {
    if (!offerSignal) return;
    start(false, offerSignal);
  }

  function hangup() {
    // encerra chamada e mídia
    cleanupPeer();
    setState(ConnState.IDLE);
  }

  function cleanupPeer() {
    try {
      const tracks = (selfVideoRef.current?.srcObject as MediaStream | null)?.getTracks?.() || [];
      tracks.forEach((t) => t.stop());
    } catch {}
    if (selfVideoRef.current) selfVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    try { peerRef.current?.destroy(); } catch {}
    peerRef.current = null;
  }

  return (
    <main className="vc">
      <header className="vc__toolbar">
        <h1>Chamada de Vídeo</h1>
        <div className="vc__actions">
          {state === ConnState.IDLE && (
            <button className="btn" onClick={() => start(true)}>Ligar</button>
          )}
          {state === ConnState.RECEIVING && (
            <button className="btn btn--primary" onClick={answer}>Atender</button>
          )}
          {state !== ConnState.IDLE && (
            <button className="btn btn--danger" onClick={hangup}>Encerrar</button>
          )}
        </div>
      </header>

      {error && <p className="vc__error">{error}</p>}

      <section className="vc__videos">
        <video ref={selfVideoRef} className="vc__video vc__video--self" playsInline />
        <video ref={remoteVideoRef} className="vc__video vc__video--remote" playsInline />
      </section>

      <footer className="vc__status">
        <span>Status: {state}</span>
        <span className="vc__ws">WS: {WS_URL}</span>
      </footer>
    </main>
  );
}
