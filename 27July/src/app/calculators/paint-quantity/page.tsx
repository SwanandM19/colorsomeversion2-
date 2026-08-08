"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, DoorClosed, PanelTop, Layers, Scan, Maximize, Paintbrush } from "lucide-react";
import {
  CalculatorShell,
  DataDisclaimer,
  HowCalculated,
  ResultStat,
  ResultsHeader,
  CalculatorCTAs,
  UnitToggle,
  StepSection,
  ChoiceGrid,
  ChoiceCard,
  CalculateButton,
  PackPanel,
  CalculatorFAQ,
  RelatedTools,
} from "@/src/components/calculators/CalculatorShell";
import {
  AREA_ASSUMPTIONS,
  PAINT_COVERAGE_SQFT_PER_LITRE,
  DEFAULT_COATS,
  WASTAGE_FACTOR,
  PACK_SIZES_LITRE,
  resolveCoverage,
} from "@/src/lib/calculators/calculatorConfig";
import { optimizePackCombination, isValidPositiveNumber, ratedSuffix, round1 } from "@/src/lib/calculators/calculatorUtils";
import { areaToSqft, sqftToArea, lengthToFeet, type AreaUnit, type LengthUnit, AREA_UNIT_LABEL, LENGTH_UNIT_LABEL } from "@/src/lib/calculators/units";

type Method = "dimensions" | "area";
type OpeningMode = "quick" | "custom";

const ACCENT = "#C9A858";
const PAINT_TYPES = Object.keys(PAINT_COVERAGE_SQFT_PER_LITRE);

const FAQ = [
  {
    q: "Should I include the ceiling?",
    a: "Only if you're painting it. Ceilings are often done in a different product (or left untouched during a repaint), so it's a separate toggle rather than being assumed.",
  },
  {
    q: "What's the difference between Quick Estimate and Custom Sizes?",
    a: "Quick Estimate uses standard reference sizes for a door and a window and multiplies by how many you have — fine for a fast figure. Custom Sizes lets you enter the actual width, height and count of each, which matters if you have large sliding windows, French doors or an unusual layout.",
  },
  {
    q: "How many coats should I choose?",
    a: "Two is the normal default for most repaints. Go to three when covering a dark colour with a lighter one, or painting a fresh, porous surface. One coat is rarely enough except for a light refresh of the same shade.",
  },
  {
    q: "Why is the recommended purchase more than the quantity required?",
    a: "Paint is sold in fixed pack sizes. The tool finds the combination of real pack sizes that covers your requirement with the least leftover — so the purchase figure is always the same as, or slightly above, what you strictly need.",
  },
];

export default function PaintQuantityCalculatorPage() {
  const [method, setMethod] = useState<Method>("dimensions");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqft");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("10");
  const [includeCeiling, setIncludeCeiling] = useState(false);

  const [openingMode, setOpeningMode] = useState<OpeningMode>("quick");
  const [doorCount, setDoorCount] = useState("1");
  const [windowCount, setWindowCount] = useState("2");
  const [doorW, setDoorW] = useState("3");
  const [doorH, setDoorH] = useState("7");
  const [doorQty, setDoorQty] = useState("1");
  const [windowW, setWindowW] = useState("4");
  const [windowH, setWindowH] = useState("3.5");
  const [windowQty, setWindowQty] = useState("2");

  const [knownArea, setKnownArea] = useState("");
  const [paintType, setPaintType] = useState(PAINT_TYPES[0]);
  const [coats, setCoats] = useState(String(DEFAULT_COATS));
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const coverageRated = resolveCoverage(paintType);
  const coverage = coverageRated.value;

  const calc = useMemo(() => {
    if (method === "area") {
      const aInput = parseFloat(knownArea);
      if (!isValidPositiveNumber(aInput)) return { netAreaSqft: 0, openingsExceed: false };
      return { netAreaSqft: areaToSqft(aInput, areaUnit), openingsExceed: false };
    }
    const l = lengthToFeet(parseFloat(length), lengthUnit);
    const w = lengthToFeet(parseFloat(width), lengthUnit);
    const h = lengthToFeet(parseFloat(height), lengthUnit);
    if (![l, w, h].every((n) => isValidPositiveNumber(n))) return { netAreaSqft: 0, openingsExceed: false };

    const wallArea = 2 * (l + w) * h;

    let openingArea: number;
    if (openingMode === "quick") {
      const doors = (parseFloat(doorCount) || 0) * AREA_ASSUMPTIONS.standardDoorSqft.value;
      const windows = (parseFloat(windowCount) || 0) * AREA_ASSUMPTIONS.standardWindowSqft.value;
      openingArea = doors + windows;
    } else {
      const dW = lengthToFeet(parseFloat(doorW) || 0, lengthUnit);
      const dH = lengthToFeet(parseFloat(doorH) || 0, lengthUnit);
      const dQ = parseFloat(doorQty) || 0;
      const wW = lengthToFeet(parseFloat(windowW) || 0, lengthUnit);
      const wH = lengthToFeet(parseFloat(windowH) || 0, lengthUnit);
      const wQ = parseFloat(windowQty) || 0;
      openingArea = dW * dH * dQ + wW * wH * wQ;
    }

    let net = wallArea - openingArea;
    const openingsExceed = net <= 0 && openingArea > 0;
    if (includeCeiling) net += l * w;
    return { netAreaSqft: Math.max(0, net), openingsExceed };
  }, [method, knownArea, areaUnit, length, width, height, lengthUnit, openingMode, doorCount, windowCount, doorW, doorH, doorQty, windowW, windowH, windowQty, includeCeiling]);

  const netAreaSqft = calc.netAreaSqft;
  const coatsNum = Math.max(1, Math.min(5, parseInt(coats) || DEFAULT_COATS));
  const rawQuantity = (netAreaSqft * coatsNum * WASTAGE_FACTOR) / coverage;
  const packResult = useMemo(() => optimizePackCombination(rawQuantity, PACK_SIZES_LITRE), [rawQuantity]);

  const handleCalculate = () => {
    if (netAreaSqft <= 0) {
      setError(
        calc.openingsExceed
          ? "Doors and windows cover the entire wall area — check your opening dimensions/counts."
          : method === "area"
          ? "Enter a valid paintable area greater than 0."
          : "Enter valid length, width and height (all greater than 0)."
      );
      setShowResult(false);
      return;
    }
    setError(null);
    setShowResult(true);
  };

  const assistanceHref = `/assistance?area=${Math.round(netAreaSqft)}&product=${encodeURIComponent(paintType)}&qty=${round1(rawQuantity)}L&source=paint-quantity-calculator`;
  const productsCategoryMap: Record<string, string> = {
    "Interior Emulsion": "interior-paints",
    "Exterior Emulsion": "exterior-paints-textures",
    Enamel: "enamels-primers-sealers",
    Primer: "enamels-primers-sealers",
    Distemper: "interior-paints",
  };
  const productsHref = `/products?category=${productsCategoryMap[paintType] ?? "All"}`;

  return (
    <CalculatorShell
      eyebrow="Paint Quantity Calculator"
      title="How Much Paint Do You Actually Need?"
      subtitle="Enter your room dimensions or a known area, pick a paint type, and get a real quantity estimate with a practical pack-size recommendation."
      accent={ACCENT}
      icon={Ruler}
    >
      <div className="space-y-4 sm:space-y-5">
        {/* ── STEP 1 — measurement method ── */}
        <StepSection
          step={1}
          title="How would you like to measure?"
          hint="Use room dimensions if you know length, width and height — or enter a paintable area directly."
          accent={ACCENT}
          action={
            method === "dimensions" ? (
              <UnitToggle value={lengthUnit} onChange={setLengthUnit} options={[["ft", "Feet"], ["m", "Metres"]]} />
            ) : (
              <UnitToggle value={areaUnit} onChange={setAreaUnit} options={[["sqft", "Sq.ft"], ["sqm", "Sq.m"]]} />
            )
          }
        >
          <ChoiceGrid cols={2}>
            <ChoiceCard
              selected={method === "dimensions"}
              onClick={() => { setMethod("dimensions"); setShowResult(false); }}
              icon={Scan}
              label="Room Dimensions"
              sublabel="Length × width × height"
              accent={ACCENT}
            />
            <ChoiceCard
              selected={method === "area"}
              onClick={() => { setMethod("area"); setShowResult(false); }}
              icon={Maximize}
              label="Known Area"
              sublabel="I already have the area"
              accent={ACCENT}
            />
          </ChoiceGrid>
        </StepSection>

        {/* ── STEP 2 — the space ── */}
        <StepSection
          step={2}
          title={method === "dimensions" ? "Tell us about the room" : "Enter your paintable area"}
          hint={method === "dimensions" ? "We'll calculate wall area, then subtract doors and windows." : undefined}
          accent={ACCENT}
        >
          <AnimatePresence mode="wait">
            {method === "dimensions" ? (
              <motion.div key="dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label={`Length (${LENGTH_UNIT_LABEL[lengthUnit]})`} value={length} onChange={setLength} />
                  <Field label={`Width (${LENGTH_UNIT_LABEL[lengthUnit]})`} value={width} onChange={setWidth} />
                  <Field label={`Height (${LENGTH_UNIT_LABEL[lengthUnit]})`} value={height} onChange={setHeight} />
                </div>

                <div className="pt-5 border-t border-[#F0EAE0] space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="text-[13px] font-bold text-charcoal">Doors &amp; Windows</p>
                      <p className="text-[12px] text-charcoal-muted mt-0.5">Subtracted from the wall area.</p>
                    </div>
                    <div className="inline-flex rounded-lg border border-[#EDE6DA] bg-[#FAF8F5] p-0.5 gap-0.5">
                      {(["quick", "custom"] as OpeningMode[]).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setOpeningMode(m)}
                          className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all min-h-[28px] ${
                            openingMode === m ? "bg-white text-charcoal shadow-sm" : "text-charcoal-muted hover:text-charcoal"
                          }`}
                        >
                          {m === "quick" ? "Quick Estimate" : "Custom Sizes"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {openingMode === "quick" ? (
                      <motion.div key="quick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-4">
                        <Field label="No. of Doors" value={doorCount} onChange={setDoorCount} icon={<DoorClosed className="w-4 h-4" />} compact />
                        <Field label="No. of Windows" value={windowCount} onChange={setWindowCount} icon={<PanelTop className="w-4 h-4" />} compact />
                      </motion.div>
                    ) : (
                      <motion.div key="custom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div className="rounded-2xl bg-[#FAF8F5] border border-[#F0EAE0] p-4">
                          <p className="text-[11px] font-black text-charcoal-muted uppercase tracking-[0.14em] mb-3">Doors</p>
                          <div className="grid grid-cols-3 gap-3">
                            <Field label={`Width (${LENGTH_UNIT_LABEL[lengthUnit]})`} value={doorW} onChange={setDoorW} />
                            <Field label={`Height (${LENGTH_UNIT_LABEL[lengthUnit]})`} value={doorH} onChange={setDoorH} />
                            <Field label="Quantity" value={doorQty} onChange={setDoorQty} />
                          </div>
                        </div>
                        <div className="rounded-2xl bg-[#FAF8F5] border border-[#F0EAE0] p-4">
                          <p className="text-[11px] font-black text-charcoal-muted uppercase tracking-[0.14em] mb-3">Windows</p>
                          <div className="grid grid-cols-3 gap-3">
                            <Field label={`Width (${LENGTH_UNIT_LABEL[lengthUnit]})`} value={windowW} onChange={setWindowW} />
                            <Field label={`Height (${LENGTH_UNIT_LABEL[lengthUnit]})`} value={windowH} onChange={setWindowH} />
                            <Field label="Quantity" value={windowQty} onChange={setWindowQty} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <label className="flex items-center gap-3 cursor-pointer min-h-[48px] rounded-xl bg-[#FAF8F5] border border-[#F0EAE0] px-4 hover:border-[#DCD2C2] transition-colors">
                  <input
                    type="checkbox"
                    checked={includeCeiling}
                    onChange={(e) => setIncludeCeiling(e.target.checked)}
                    className="w-5 h-5 rounded accent-[#C9A858]"
                  />
                  <span className="text-[13.5px] font-semibold text-charcoal">Include ceiling in paintable area</span>
                </label>
              </motion.div>
            ) : (
              <motion.div key="area" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Field label={`Paintable Area (${AREA_UNIT_LABEL[areaUnit]})`} value={knownArea} onChange={setKnownArea} icon={<Ruler className="w-4 h-4" />} />
              </motion.div>
            )}
          </AnimatePresence>
        </StepSection>

        {/* ── STEP 3 — product & coats ── */}
        <StepSection step={3} title="Choose your paint" hint="Coverage differs by product type, which changes how much you need." accent={ACCENT}>
          <div className="space-y-5">
            <ChoiceGrid cols={5}>
              {PAINT_TYPES.map((t) => (
                <ChoiceCard
                  key={t}
                  selected={paintType === t}
                  onClick={() => setPaintType(t)}
                  icon={Paintbrush}
                  label={t}
                  accent={ACCENT}
                />
              ))}
            </ChoiceGrid>

            <div className="pt-5 border-t border-[#F0EAE0]">
              <p className="text-[13px] font-bold text-charcoal mb-3">Number of coats</p>
              <ChoiceGrid cols={3}>
                {[
                  { v: "1", label: "1 Coat", sub: "Light refresh" },
                  { v: "2", label: "2 Coats", sub: "Recommended" },
                  { v: "3", label: "3 Coats", sub: "Dark → light" },
                ].map((c) => (
                  <ChoiceCard
                    key={c.v}
                    selected={coats === c.v}
                    onClick={() => setCoats(c.v)}
                    icon={Layers}
                    label={c.label}
                    sublabel={c.sub}
                    accent={ACCENT}
                  />
                ))}
              </ChoiceGrid>
            </div>
          </div>
        </StepSection>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-rose-200 bg-rose-50/70 px-5 py-4"
          >
            <p className="text-[13.5px] text-rose-700 font-semibold">{error}</p>
          </motion.div>
        )}

        <CalculateButton onClick={handleCalculate} label="Calculate Paint Quantity" accent={ACCENT} />

        <AnimatePresence>
          {showResult && netAreaSqft > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 pt-2"
            >
              <ResultsHeader accent={ACCENT} />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <ResultStat
                  value={sqftToArea(netAreaSqft, areaUnit).toLocaleString(undefined, { maximumFractionDigits: areaUnit === "sqm" ? 1 : 0 })}
                  label={`Paintable ${AREA_UNIT_LABEL[areaUnit]}`}
                  accent="#C4704B"
                />
                <ResultStat value={`${round1(rawQuantity)} L`} label="Paint Required" accent={ACCENT} />
                <ResultStat value={`${round1(packResult.totalPurchased)} L`} label="Recommended Purchase" accent="#8B9E7E" />
              </div>

              <PackPanel
                combo={packResult.combo}
                unit="L"
                leftover={round1(packResult.leftover)}
                accent={ACCENT}
              />

              <HowCalculated
                rows={[
                  { label: "Paintable area", value: `${Math.round(netAreaSqft)} sq.ft` },
                  { label: "Coats", value: String(coatsNum) },
                  { label: "Coverage used", value: `${coverage} sq.ft/L per coat (${paintType})${ratedSuffix(coverageRated.status)}` },
                  { label: "Wastage buffer", value: `${Math.round((WASTAGE_FACTOR - 1) * 100)}%` },
                  { label: "Formula", value: "(Area × Coats × Wastage) ÷ Coverage" },
                ]}
              />

              <CalculatorCTAs assistanceHref={assistanceHref} productsHref={productsHref} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-6 space-y-10">
          <CalculatorFAQ items={FAQ} />
          <RelatedTools currentHref="/calculators/paint-quantity" />
          <DataDisclaimer />
        </div>
      </div>
    </CalculatorShell>
  );
}

function Field({
  label,
  value,
  onChange,
  icon,
  compact,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div>
      <label className="label-premium">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B8E7E] pointer-events-none">{icon}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          className={`input-premium min-h-[48px] ${icon ? (compact ? "pl-11" : "pl-10") : ""}`}
          placeholder="0"
        />
      </div>
    </div>
  );
}
