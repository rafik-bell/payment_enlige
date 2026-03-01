"use client";

import { useState ,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


const months = [
  "01 - Janvier", "02 - Février", "03 - Mars", "04 - Avril",
  "05 - Mai", "06 - Juin", "07 - Juillet", "08 - Août",
  "09 - Septembre", "10 - Octobre", "11 - Novembre", "12 - Décembre",
];

const years = Array.from({ length: 15 }, (_, i) => String(new Date().getFullYear() + i));

export default function CIBPaymentPage() {
  const searchParams = useSearchParams();
  
    const router = useRouter();

const priceParam = searchParams.get("price") ?? "149.99";
const [step, setStep] = useState("form");
  const [form, setForm] = useState({
    cardNumber: "",
    cvv2: "",
    month: "12 - Décembre",
    year: "2025",
    fullName: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.cardNumber.replace(/\s/g, "").match(/^\d{16}$/))
      e.cardNumber = "Numéro de carte invalide (16 chiffres requis)";
    if (!form.cvv2.match(/^\d{3}$/))
      e.cvv2 = "CVV2 invalide (3 chiffres)";
    if (!form.fullName.trim())
      e.fullName = "Nom et prénom requis";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2000);
  };

  useEffect(() => {
    if (step === "success") {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("status", "success");
      router.replace(newUrl.toString());
    }
  }, [step, router]);

  if (step === "success") {
    return (
        <div className="cib-success-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;700&display=swap');
  
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
          .cib-success-page {
            min-height: 100vh;
            background: #eef2f7;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            font-family: 'IBM Plex Sans', sans-serif;
          }
  
          .cib-success-card {
            width: 100%;
            max-width: 520px;
            background: white;
            border-radius: 8px;
            border: 1px solid #c8d8ea;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(26,111,186,0.10);
          }
  
          /* Header — same as payment page */
          .cib-success-header {
            background: linear-gradient(135deg, #1a6fba 0%, #1558a0 100%);
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
          .cib-success-header-left {
            display: flex;
            align-items: center;
            gap: 14px;
            flex: 1;
            min-width: 0;
          }
          .cib-success-header-text {
            color: white;
            font-size: 13px;
            font-weight: 700;
            line-height: 1.5;
            letter-spacing: 0.03em;
            text-transform: uppercase;
          }
          .cib-success-header-sub { font-size: 12px; font-weight: 600; }
  
          /* Section title bar */
          .cib-success-section-title {
            background: #2a82cc;
            color: white;
            padding: 8px 20px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.02em;
            border-top: 1px solid #dce8f3;
          }
  
          /* Body */
          .cib-success-body {
            padding: 36px 24px 32px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            text-align: center;
          }
  
          /* Checkmark circle */
          .cib-success-icon {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: #e8f5e9;
            border: 3px solid #43a047;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: cib-pop 0.4s ease forwards;
            flex-shrink: 0;
          }
          .cib-success-icon svg {
            width: 36px;
            height: 36px;
          }
          @keyframes cib-pop {
            0%   { transform: scale(0); }
            70%  { transform: scale(1.15); }
            100% { transform: scale(1); }
          }
  
          .cib-success-title {
            font-size: 22px;
            font-weight: 700;
            color: #1a4a7a;
          }
          .cib-success-subtitle {
            font-size: 14px;
            color: #6a8aaa;
            margin-top: -12px;
          }
  
          /* Amount box */
          .cib-success-amount-box {
            background: #f0f6fc;
            border: 1px solid #b8d4ee;
            border-radius: 6px;
            padding: 18px 40px;
            width: 100%;
            max-width: 320px;
          }
          .cib-success-amount-label {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.15em;
            color: #6a8aaa;
            text-transform: uppercase;
            margin-bottom: 6px;
          }
          .cib-success-amount-value {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 32px;
            font-weight: 700;
            color: #1a6fba;
            letter-spacing: 0.02em;
          }
          .cib-success-amount-currency {
            font-size: 16px;
            font-weight: 600;
            color: #6a8aaa;
            margin-left: 6px;
            font-family: 'IBM Plex Sans', sans-serif;
          }
  
          /* Info rows */
          .cib-success-info-grid {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0;
            border: 1px solid #dce8f3;
            border-radius: 6px;
            overflow: hidden;
          }
          .cib-success-info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 16px;
            border-bottom: 1px solid #eef4fa;
            font-size: 13px;
          }
          .cib-success-info-row:last-child { border-bottom: none; }
          .cib-success-info-key {
            color: #6a8aaa;
            font-weight: 500;
          }
          .cib-success-info-val {
            color: #1a2a4a;
            font-weight: 600;
            text-align: right;
          }
          .cib-success-status-badge {
            background: #e8f5e9;
            color: #2e7d32;
            border: 1px solid #a5d6a7;
            border-radius: 20px;
            padding: 2px 12px;
            font-size: 12px;
            font-weight: 600;
          }
  
          /* Back button */
          .cib-success-btn {
            background: #e07b1a;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 11px 36px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: opacity 0.15s, transform 0.1s;
            margin-top: 4px;
          }
          .cib-success-btn:hover  { opacity: 0.88; transform: translateY(-1px); }
          .cib-success-btn:active { transform: translateY(0); }
  
          /* Footer */
          .cib-success-footer {
            background: #2a82cc;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 20px;
            color: white;
            font-size: 13px;
            font-weight: 600;
            border-top: 1px solid #dce8f3;
          }
          .cib-success-footer-link {
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            line-height: 1.4;
          }
          .cib-success-footer-phone {
            display: flex;
            align-items: center;
            gap: 6px;
            line-height: 1.4;
          }
          .cib-success-footer-icon {
            background: white;
            color: #2a82cc;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 13px;
            flex-shrink: 0;
          }
  
          /* Responsive */
          @media (max-width: 480px) {
            .cib-success-page { padding: 0; align-items: flex-start; }
            .cib-success-card { border-radius: 0; border-left: none; border-right: none; min-height: 100vh; }
            .cib-success-header-text { font-size: 10px; }
            .cib-success-header-sub  { font-size: 9px; }
            .cib-success-body { padding: 28px 16px 24px; }
            .cib-success-amount-box { padding: 14px 20px; }
            .cib-success-amount-value { font-size: 26px; }
          }
        `}</style>
  
        <div className="cib-success-card">
  
          {/* Header */}
          <div className="cib-success-header">
            <div className="cib-success-header-left">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <rect width="42" height="42" rx="6" fill="white"/>
                <text x="5" y="30" fontSize="22" fontWeight="800" fill="#e07b1a">C</text>
                <text x="20" y="30" fontSize="22" fontWeight="800" fill="#1a6fba">B</text>
              </svg>
              <div className="cib-success-header-text">
                PLATEFORME DE PAIEMENT AVEC CARTE CIB<br/>
                <span className="cib-success-header-sub">EDAHABIA — ALGÉRIE POSTE</span>
              </div>
            </div>
            <svg width="50" height="42" viewBox="0 0 56 46" fill="none">
              <ellipse cx="28" cy="23" rx="26" ry="20" fill="white" opacity="0.15"/>
              <text x="28" y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">ALGÉRIE</text>
              <text x="28" y="39" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f0a840">POSTE</text>
            </svg>
          </div>
  
          {/* Section title */}
          <div className="cib-success-section-title">Résultat de la transaction</div>
  
          {/* Body */}
          <div className="cib-success-body">
  
            {/* Icon */}
            <div className="cib-success-icon">
              <svg viewBox="0 0 36 36" fill="none" stroke="#43a047" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,18 14,26 30,10"/>
              </svg>
            </div>
  
            <div className="cib-success-title">Paiement réussi !</div>
            <p className="cib-success-subtitle">Votre transaction a été confirmée avec succès.</p>
  
            {/* Amount */}
            <div className="cib-success-amount-box">
              <div className="cib-success-amount-label">Montant payé</div>
              <div>
                <span className="cib-success-amount-value">{priceParam}</span>
                <span className="cib-success-amount-currency">DZD</span>
              </div>
            </div>
  
            {/* Transaction details */}
            <div className="cib-success-info-grid">
              <div className="cib-success-info-row">
                <span className="cib-success-info-key">Commerçant</span>
                <span className="cib-success-info-val">Smart Transport algerie</span>
              </div>
              <div className="cib-success-info-row">
                <span className="cib-success-info-key">Date</span>
                <span className="cib-success-info-val">
                  {new Date().toLocaleDateString("fr-DZ", { day: "2-digit", month: "long", year: "numeric" })}
                </span>
              </div>
              <div className="cib-success-info-row">
                <span className="cib-success-info-key">Statut</span>
                <span className="cib-success-status-badge">✓ Approuvé</span>
              </div>
            </div>
  
            <button className="cib-success-btn" onClick={() => window.history.back()}>
              Retour à l&apos;accueil
            </button>
  
          </div>
  
          {/* Footer */}
          <div className="cib-success-footer">
            <a href="https://www.satim.dz" className="cib-success-footer-link" target="_blank" rel="noreferrer">
              <span className="cib-success-footer-icon">?</span>
              <span>AIDE<br/><small style={{fontWeight: 400}}>www.satim.dz</small></span>
            </a>
            <div className="cib-success-footer-phone">
              <span className="cib-success-footer-icon">☎</span>
              <span>3020<br/><small style={{fontWeight: 400}}>APPEL GRATUIT</small></span>
            </div>
          </div>
  
        </div>
      </div>
    );
  }

  const handleReset = () => {
    setForm({ cardNumber: "", cvv2: "", month: "12 - Décembre", year: "2025", fullName: "" });
    setErrors({});
  };

  const formatCard = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  return (
    <div className="cib-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cib-page {
          min-height: 100vh;
          background: #eef2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          font-family: 'IBM Plex Sans', sans-serif;
        }

        .cib-card {
          width: 100%;
          max-width: 760px;
          background: white;
          border-radius: 8px;
          border: 1px solid #c8d8ea;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(26,111,186,0.10);
        }

        /* HEADER */
        .cib-header {
          background: linear-gradient(135deg, #1a6fba 0%, #1558a0 100%);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .cib-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }
        .cib-header-logo { flex-shrink: 0; }
        .cib-header-text {
          color: white;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.5;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .cib-header-sub { font-size: 13px; font-weight: 600; }
        .cib-ap-logo { flex-shrink: 0; }

        /* SECTION */
        .cib-section { border-top: 1px solid #dce8f3; }
        .cib-section-title {
          background: #2a82cc;
          color: white;
          padding: 8px 20px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        /* INFO GRID */
        .cib-info-grid {
          padding: 14px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cib-info-row { display: flex; gap: 10px; }
        .cib-info-label {
          width: 120px;
          text-align: right;
          font-weight: 600;
          color: #1a4a7a;
          font-size: 14px;
          flex-shrink: 0;
        }
        .cib-info-value { color: #333; font-size: 14px; }

        /* FORM */
        .cib-form {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cib-field {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .cib-label {
          width: 220px;
          text-align: right;
          font-size: 14px;
          font-weight: 500;
          color: #1a4a7a;
          padding-top: 8px;
          flex-shrink: 0;
        }
        .cib-req { color: #e07b1a; }
        .cib-input-wrap { flex: 1; min-width: 0; }

        .cib-input {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #b0c8e0;
          border-radius: 4px;
          font-size: 14px;
          color: #222;
          background: white;
          font-family: 'IBM Plex Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cib-input:focus {
          outline: none;
          border-color: #1a6fba;
          box-shadow: 0 0 0 3px rgba(26,111,186,0.15);
        }
        .cib-input-mono {
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.1em;
        }
        .cib-input-cvv {
          width: 100px;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.2em;
        }
        .cib-error { color: #c0392b; font-size: 12px; margin-top: 4px; }

        .cib-selects { display: flex; gap: 10px; }
        .cib-select {
          padding: 8px 10px;
          border: 1px solid #b0c8e0;
          border-radius: 4px;
          font-size: 14px;
          color: #222;
          background: white;
          cursor: pointer;
          font-family: 'IBM Plex Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cib-select:focus {
          outline: none;
          border-color: #1a6fba;
          box-shadow: 0 0 0 3px rgba(26,111,186,0.15);
        }
        .cib-select-month { width: 180px; }
        .cib-select-year  { width: 100px; }

        /* BUTTONS */
        .cib-btn-row {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 4px;
        }
        .cib-btn {
          cursor: pointer;
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 600;
          border: none;
          border-radius: 4px;
          padding: 10px 28px;
          font-size: 14px;
          background: #e07b1a;
          color: white;
          min-width: 110px;
          transition: opacity 0.15s, transform 0.1s;
        }
        .cib-btn:hover  { opacity: 0.88; transform: translateY(-1px); }
        .cib-btn:active { transform: translateY(0); }
        .cib-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        /* FOOTER */
        .cib-footer {
          background: #2a82cc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 20px;
          color: white;
          font-size: 13px;
          font-weight: 600;
        }
        .cib-footer-link {
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          line-height: 1.4;
        }
        .cib-footer-phone {
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1.4;
        }
        .cib-footer-icon {
          background: white;
          color: #2a82cc;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
          flex-shrink: 0;
        }

        /* ══════════════════════════════════════
           TABLET  ≤ 600px
        ══════════════════════════════════════ */
        @media (max-width: 600px) {
          .cib-page {
            padding: 0;
            align-items: flex-start;
          }
          .cib-card {
            border-radius: 0;
            border-left: none;
            border-right: none;
            min-height: 100vh;
          }

          /* header */
          .cib-header { padding: 12px 14px; }
          .cib-header-text { font-size: 11px; }
          .cib-header-sub  { font-size: 10px; }
          .cib-header-logo svg { width: 34px; height: 34px; }

          /* info rows become stacked */
          .cib-info-row { flex-direction: column; gap: 1px; }
          .cib-info-label { width: auto; text-align: left; }

          /* form fields become stacked */
          .cib-field { flex-direction: column; gap: 4px; }
          .cib-label { width: auto; text-align: left; padding-top: 0; font-size: 13px; }

          /* selects full width */
          .cib-selects { flex-direction: column; }
          .cib-select-month,
          .cib-select-year { width: 100%; }

          /* cvv full width on mobile */
          .cib-input-cvv { width: 100%; }

          /* buttons stack */
          .cib-btn-row { flex-direction: column; align-items: stretch; }
          .cib-btn { min-width: unset; width: 100%; padding: 13px; font-size: 15px; }
        }

        /* ══════════════════════════════════════
           VERY SMALL  ≤ 380px
        ══════════════════════════════════════ */
        @media (max-width: 380px) {
          .cib-ap-logo { display: none; }
          .cib-header-text { font-size: 10px; }
          .cib-form, .cib-info-grid { padding: 14px; }
        }
      `}</style>

      <div className="cib-card">

        {/* Header */}
        <div className="cib-header">
          <div className="cib-header-left">
            <div className="cib-header-logo">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <rect width="42" height="42" rx="6" fill="white"/>
                <text x="5" y="30" fontSize="22" fontWeight="800" fill="#e07b1a">C</text>
                <text x="20" y="30" fontSize="22" fontWeight="800" fill="#1a6fba">B</text>
              </svg>
            </div>
            <div className="cib-header-text">
              BIENVENUE SUR LA PLATEFORME DE PAIEMENT<br />
              <span className="cib-header-sub">AVEC CARTE CIB - EDAHABIA</span>
            </div>
          </div>
          <div className="cib-ap-logo">
            <svg width="56" height="46" viewBox="0 0 56 46" fill="none">
              <ellipse cx="28" cy="23" rx="26" ry="20" fill="white" opacity="0.15"/>
              <text x="28" y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">ALGÉRIE</text>
              <text x="28" y="39" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f0a840">POSTE</text>
            </svg>
          </div>
        </div>

        {/* Payment Info */}
        <div className="cib-section">
          <div className="cib-section-title">Informations du paiement</div>
          <div className="cib-info-grid">
            {[
              ["Commerçant", "Smart Transport algerie"],
              ["Site Web", "—"],
              ["Montant", `${priceParam} DZD`],
            ].map(([label, value]) => (
              <div className="cib-info-row" key={label}>
                <span className="cib-info-label">{label}</span>
                <span className="cib-info-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Form */}
        <div className="cib-section">
          <div className="cib-section-title">Informations client</div>
          <form className="cib-form" onSubmit={handleSubmit} noValidate>

            {/* Card Number */}
            <div className="cib-field">
              <label className="cib-label">
                Numéro de votre carte CIB <span className="cib-req">*</span>
              </label>
              <div className="cib-input-wrap">
                <input
                  className="cib-input cib-input-mono"
                  value={form.cardNumber}
                  onChange={e => setForm({ ...form, cardNumber: formatCard(e.target.value) })}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                  inputMode="numeric"
                />
                {errors.cardNumber && <div className="cib-error">{errors.cardNumber}</div>}
              </div>
            </div>

            {/* CVV2 */}
            <div className="cib-field">
              <label className="cib-label">CVV2 <span className="cib-req">*</span></label>
              <div className="cib-input-wrap">
                <input
                  className="cib-input cib-input-cvv"
                  value={form.cvv2}
                  onChange={e => setForm({ ...form, cvv2: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                  placeholder="•••"
                  type="password"
                  maxLength={3}
                  inputMode="numeric"
                />
                {errors.cvv2 && <div className="cib-error">{errors.cvv2}</div>}
              </div>
            </div>

            {/* Expiry */}
            <div className="cib-field">
              <label className="cib-label">
                Date d&apos;Expiration <span className="cib-req">*</span>
              </label>
              <div className="cib-selects">
                <select
                  className="cib-select cib-select-month"
                  value={form.month}
                  onChange={e => setForm({ ...form, month: e.target.value })}
                >
                  {months.map(m => <option key={m}>{m}</option>)}
                </select>
                <select
                  className="cib-select cib-select-year"
                  value={form.year}
                  onChange={e => setForm({ ...form, year: e.target.value })}
                >
                  {years.map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>

            {/* Full Name */}
            <div className="cib-field">
              <label className="cib-label">Nom Prénom <span className="cib-req">*</span></label>
              <div className="cib-input-wrap">
                <input
                  className="cib-input"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Prénom NOM"
                  autoComplete="name"
                />
                {errors.fullName && <div className="cib-error">{errors.fullName}</div>}
              </div>
            </div>

            {/* Buttons */}
            <div className="cib-btn-row">
              <button type="submit" className="cib-btn" disabled={loading}>
                {loading ? "Traitement…" : "Valider"}
              </button>
              <button type="button" className="cib-btn" onClick={handleReset}>
                Réinitialiser
              </button>
              <button type="button" className="cib-btn">
                Annuler
              </button>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="cib-footer">
          <a href="https://www.satim.dz" className="cib-footer-link" target="_blank" rel="noreferrer">
            <span className="cib-footer-icon">?</span>
            <span>AIDE<br/><small style={{fontWeight: 400}}>www.satim.dz</small></span>
          </a>
          <div className="cib-footer-phone">
            <span className="cib-footer-icon">☎</span>
            <span>3020<br/><small style={{fontWeight: 400}}>APPEL GRATUIT</small></span>
          </div>
        </div>

      </div>
    </div>
  );
}