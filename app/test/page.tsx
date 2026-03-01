"use client"; 
import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";


const cardIcons = {
  visa: (
    <svg viewBox="0 0 48 32" fill="none" className="h-7 w-11">
      <rect width="48" height="32" rx="4" fill="#1A1F71"/>
      <text x="8" y="23" fill="white" fontSize="14" fontWeight="bold" fontFamily="serif">VISA</text>
    </svg>
  ),
  mastercard: (
    <svg viewBox="0 0 48 32" fill="none" className="h-7 w-11">
      <rect width="48" height="32" rx="4" fill="#252525"/>
      <circle cx="18" cy="16" r="9" fill="#EB001B"/>
      <circle cx="30" cy="16" r="9" fill="#F79E1B"/>
      <path d="M24 9.5a9 9 0 0 1 0 13 9 9 0 0 1 0-13z" fill="#FF5F00"/>
    </svg>
  ),
  amex: (
    <svg viewBox="0 0 48 32" fill="none" className="h-7 w-11">
      <rect width="48" height="32" rx="4" fill="#2E77BC"/>
      <text x="6" y="22" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
    </svg>
  ),
};

function detectCardType(number) {
  const n = number.replace(/\s/g, "");
  if (n.startsWith("4")) return "visa";
  if (n.startsWith("5") || n.startsWith("2")) return "mastercard";
  if (n.startsWith("3")) return "amex";
  return null;
}

function formatCard(value) {
  const v = value.replace(/\D/g, "").slice(0, 16);
  return v.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const v = value.replace(/\D/g, "").slice(0, 4);
  if (v.length >= 3) return v.slice(0, 2) + "/" + v.slice(2);
  return v;
}

export default function Home() {
  const searchParams = new URLSearchParams(window.location.search);

// Get the price parameter, defaulting to "149.99" if not present
const priceParam = searchParams.get("price") ?? "149.99";

console.log(priceParam)
  const [step, setStep] = useState("form"); // form | success
  const [flip, setFlip] = useState(false);
  const [form, setForm] = useState({ name: "", card: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const cardType = detectCardType(form.card);

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "card") value = formatCard(value);
    if (name === "expiry") value = formatExpiry(value);
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Nom requis";
    if (form.card.replace(/\s/g, "").length < 16) e.card = "Numéro invalide";
    if (form.expiry.length < 5) e.expiry = "Date invalide";
    if (form.cvv.length < 3) e.cvv = "CVV invalide";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("success"); }, 2000);
  }
  useEffect(() => {
    if (step === "success") {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("status", "success");
      router.replace(newUrl.toString()); // Updates URL without reloading
    }
  }, [step, router]);

  if (step === "success") {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #00d4aa, #0099ff)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36, animation: "pop 0.4s ease" }}>✓</div>
          <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Paiement réussi !</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>Votre transaction a été confirmée.</p>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 32px", display: "inline-block" }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 2, marginBottom: 4 }}>MONTANT PAYÉ</div>
            <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "'Space Mono', monospace", background: "linear-gradient(90deg, #00d4aa, #0099ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{priceParam} DZD</div>
          </div>
          <div style={{ marginTop: 32 }}>
          </div>
        </div>
        <style>{`@keyframes pop { 0% { transform: scale(0); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { outline: none; }
        .field { position: relative; margin-bottom: 16px; }
        .label { display: block; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px; font-weight: 500; }
        .inp { width: 100%; background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 16px; color: white; font-size: 15px; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s, background 0.2s; }
        .inp:focus { border-color: rgba(0,212,170,0.6); background: rgba(255,255,255,0.08); }
        .inp.error { border-color: rgba(255,80,80,0.6); }
        .err-msg { font-size: 11px; color: #ff6b6b; margin-top: 4px; }
        .pay-btn { width: 100%; padding: 16px; border: none; border-radius: 14px; background: linear-gradient(135deg, #00d4aa, #0099ff); color: white; font-size: 16px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.2s, transform 0.15s; letter-spacing: 0.5px; }
        .pay-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .pay-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .card-vis { width: 100%; height: 180px; position: relative; margin-bottom: 28px; perspective: 1000px; }
        .card-inner { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-inner.flipped { transform: rotateY(180deg); }
        .card-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 18px; padding: 24px; }
        .card-front { background: linear-gradient(135deg, #1e2a5e 0%, #2d1b69 50%, #1a3a4a 100%); border: 1px solid rgba(255,255,255,0.12); }
        .card-back { background: linear-gradient(135deg, #1a3a4a 0%, #2d1b69 100%); border: 1px solid rgba(255,255,255,0.12); transform: rotateY(180deg); }
        .chip { width: 40px; height: 30px; background: linear-gradient(135deg, #d4a843, #f0cc6e); border-radius: 6px; margin-bottom: 20px; position: relative; overflow: hidden; }
        .chip::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 8px), repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 8px); }
        .card-num { font-family: 'Space Mono', monospace; font-size: 17px; letter-spacing: 3px; color: white; margin-bottom: 16px; }
        .card-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
        .card-label { font-size: 9px; letter-spacing: 1.5px; color: rgba(255,255,255,0.4); margin-bottom: 3px; }
        .card-val { font-size: 13px; color: white; font-weight: 500; }
        .mag-strip { height: 40px; background: #111; margin: 20px -24px; }
        .cvv-strip { background: rgba(255,255,255,0.9); border-radius: 4px; padding: 8px 12px; margin: 16px 0; text-align: right; font-family: 'Space Mono', monospace; font-size: 16px; color: #222; letter-spacing: 4px; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Card Visual */}
        <div className="card-vis">
          <div className={`card-inner ${flip ? "flipped" : ""}`}>
            <div className="card-face card-front">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="chip" />
                {cardType && cardIcons[cardType]}
              </div>
              <div className="card-num">
                {(form.card || "•••• •••• •••• ••••").padEnd(19, "•").slice(0, 19)}
              </div>
              <div className="card-bottom">
                <div>
                  <div className="card-label">TITULAIRE</div>
                  <div className="card-val">{form.name || "VOTRE NOM"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="card-label">EXPIRATION</div>
                  <div className="card-val">{form.expiry || "MM/YY"}</div>
                </div>
              </div>
            </div>
            <div className="card-face card-back">
              <div className="mag-strip" />
              <div className="cvv-strip">{form.cvv ? "•".repeat(form.cvv.length) : "•••"}</div>
              <div style={{ textAlign: "right", color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Code sécurité</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ color: "white", fontSize: 20, fontWeight: 600, margin: 0 }}>Paiement en ligne</h2>
            <div style={{ fontFamily: "'Space Mono', monospace", color: "#00d4aa", fontSize: 18, fontWeight: 700 }}>{priceParam} DZD</div>
          </div>

          <div className="field">
            <label className="label">Nom du titulaire</label>
            <input className={`inp${errors.name ? " error" : ""}`} name="name" value={form.name} onChange={handleChange} placeholder="Jean Dupont" autoComplete="cc-name" />
            {errors.name && <div className="err-msg">{errors.name}</div>}
          </div>

          <div className="field">
            <label className="label">Numéro de carte</label>
            <input className={`inp${errors.card ? " error" : ""}`} name="card" value={form.card} onChange={handleChange} placeholder="0000 0000 0000 0000" inputMode="numeric" autoComplete="cc-number" />
            {errors.card && <div className="err-msg">{errors.card}</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <label className="label">Expiration</label>
              <input className={`inp${errors.expiry ? " error" : ""}`} name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/AA" inputMode="numeric" autoComplete="cc-exp" />
              {errors.expiry && <div className="err-msg">{errors.expiry}</div>}
            </div>
            <div className="field">
              <label className="label">CVV</label>
              <input className={`inp${errors.cvv ? " error" : ""}`} name="cvv" value={form.cvv} onChange={handleChange} placeholder="•••" inputMode="numeric" autoComplete="cc-csc"
                onFocus={() => setFlip(true)} onBlur={() => setFlip(false)} />
              {errors.cvv && <div className="err-msg">{errors.cvv}</div>}
            </div>
          </div>

          <button className="pay-btn" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8 }}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                Traitement en cours…
              </span>
            ) : "🔒 Payer maintenant"}
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }}>
            {["🔐 SSL sécurisé", "✦ Chiffrement 256-bit", "✦ PCI DSS"].map((t) => (
              <span key={t} style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 0.5 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}