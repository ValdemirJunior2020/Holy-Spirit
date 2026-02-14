// client/src/components/DonateModal.jsx
import React from "react";

// ✅ YOUR PAYPAL LINK
const DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=AVGrpQVYtko_8HB3xnNgxDLw_CG6LqkLza-LZiv2VV7AUlA_zPAmwglv0LrEr1bEh_BQ-jzEjWhcxTVR";

export default function DonateModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 animate-in fade-in duration-200">
      {/* Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* The Beautiful Card */}
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5 scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Icon & Message */}
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4 shadow-sm ring-4 ring-amber-50/50">
            <span className="text-3xl">🙏</span>
          </div>
          
          <h3 className="text-xl font-black text-slate-900 mb-2">
            My Biggest Request
          </h3>
          
          <p className="text-base font-medium text-slate-600 leading-relaxed mb-6 px-2">
            "I just need your prayers. Please take 5 minutes of your day and pray for me."
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {/* Main Button: I will pray */}
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition"
          >
            I will pray for you
          </button>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Optional</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {/* Secondary: PayPal */}
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center rounded-2xl bg-white py-3 text-xs font-bold text-slate-400 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-600 transition"
          >
            Support financially (PayPal)
          </a>
        </div>
      </div>
    </div>
  );
}