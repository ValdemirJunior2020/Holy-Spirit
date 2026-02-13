// client/src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import HeroCard from "../components/HeroCard.jsx";
import PartnersRow from "../components/PartnersRow.jsx";
import PartnerModal from "../components/PartnerModal.jsx";
import { PARTNERS } from "../data/partners.js";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const previewPartners = useMemo(() => PARTNERS.slice(0, 3), []);

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <HeroCard />
      <PartnersRow partners={previewPartners} onSelect={setSelected} />
      <PartnerModal partner={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
