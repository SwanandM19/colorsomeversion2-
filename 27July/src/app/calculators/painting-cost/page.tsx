"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, Home, Sun, Sparkles, RefreshCw, Paintbrush, Layers,
  Gem, Award, Coins,
} from "lucide-react";
import {
  CalculatorShell,
  DataDisclaimer,
  HowCalculated,
  ResultsHeader,
  TotalPanel,
  CalculatorCTAs,
  UnitToggle,
  StepSection,
  ChoiceGrid,
  ChoiceCard,
  CalculateButton,
  CalculatorFAQ,
  RelatedTools,
} from "@/src/components/calculators/CalculatorShell";
import {
  DEFAULT_COATS,
  WASTAGE_FACTOR,
  LABOUR_RATE_PER_SQFT,
  PRIMER_PUTTY,
  PAINT_RATE_PER_LITRE,
  resolveCoverage,
} from "@/src/lib/calculators/calculatorConfig";
import { formatINR, isValidPositiveNumber, ratedSuffix, round1 } from "@/src/lib/calculators/calculatorUtils";
import { areaToSqft, type AreaUnit, AREA_UNIT_LABEL } from "@/src/lib/calculators/units";

type Surface = "interior" | "exterior";
type ProjectType = "fresh" | "repaint";
type Tier = "economy" | "premium" | "luxury";

const ACCENT = "#C4704B";
const INTERIOR_PAINTS = ["Interior Emulsion", "Distemper"];
const EXTERIOR_PAINTS = ["Exterior Emulsion", "Enamel"];

const TIERS: { v: Tier; label: string; sub: string; icon: React.ElementType }[] = [
  { v: "economy", label: "Economy", sub: "Budget-friendly", icon: Coins },
  { v: "premium", label: "Premium", sub: "Best balance", icon: Award },
  { v: "luxury", label: "Luxury", sub: "Top-of-range", icon: Gem },
];

const FAQ = [
  {
    q: "Is labour included in this estimate?",
    a: "Only if you leave the labour toggle on. It's applied as a per-square-foot rate that differs for interior and exterior work. Turn it off if you're buying materials only or already have a contractor quote.",
  },
  {
    q: "Why is there a cost range rather than one number?",
    a: "The total is shown as a ±10% band because real project costs move with site conditions, surface preparation needs, shade selection and local labour rates. Treat the band as a realistic budgeting window.",
  },
  {
    q: "When do I need putty?",
    a: "Wall putty is normally used on fresh masonry to create a smooth, even base before primer. On a repaint over a sound existing surface it's often unnecessary, so the option only appears for fresh painting projects.",
  },
  {
    q: "Are these Colorsome's actual prices?",
    a: "No. The rates used here are generic industry-standard reference figures for planning purposes, and every one of them is labelled 'indicative' in the calculation breakdown. For confirmed pricing, request a quote.",
  },
];

export default function PaintingCostCalculatorPage() {
  const [surface, setSurface] = useState<Surface>("interior");
  const [projectType, setProjectType] = useState<ProjectType>("fresh");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqft");
  const [area, setArea] = useState("");
  const [paintType, setPaintType] = useState(INTERIOR_PAINTS[0]);
  const [tier, setTier] = useState<Tier>("premium");
  const [coats, setCoats] = useState(String(DEFAULT_COATS));
  const [includePrimer, setIncludePrimer] = useState(true);
  const [includePutty, setIncludePutty] = useState(true);
  const [includeLabour, setIncludeLabour] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paintOptions = surface === "interior" ? INTERIOR_PAINTS : EXTERIOR_PAINTS;
  const coverageRated = resolveCoverage(paintType);
  const coverage = coverageRated.value;
  const coatsNum = Math.max(1, Math.min(5, parseInt(coats) || DEFAULT_COATS));
  const areaSqft = areaToSqft(parseFloat(area) || 0, areaUnit);

  const breakdown = useMemo(() => {
    if (areaSqft <= 0) return null;
    const paintQtyLitres = (areaSqft * coatsNum * WASTAGE_FACTOR) / coverage;
    const paintCost = paintQtyLitres * PAINT_RATE_PER_LITRE[tier].value;

    const primerQtyLitres = includePrimer ? (areaSqft * WASTAGE_FACTOR) / PRIMER_PUTTY.primerCoverageSqftPerLitre.value : 0;
    const primerCost = primerQtyLitres * PRIMER_PUTTY.primerRatePerLitre.value;

    const puttyQtyKg = includePutty && projectType === "fresh" ? (areaSqft * WASTAGE_FACTOR) / PRIMER_PUTTY.puttyCoverageSqftPerKg.value : 0;
    const puttyCost = puttyQtyKg * PRIMER_PUTTY.puttyRatePerKg.value;

    const labourCost = includeLabour ? areaSqft * LABOUR_RATE_PER_SQFT[surface].value : 0;

    const total = paintCost + primerCost + puttyCost + labourCost;
    return {
      paintQtyLitres, paintCost, primerQtyLitres, primerCost, puttyQtyKg, puttyCost, labourCost, total,
      totalLow: total * 0.9, totalHigh: total * 1.1,
    };
  }, [areaSqft, coatsNum, coverage, tier, includePrimer, includePutty, includeLabour, projectType, surface]);

  const handleCalculate = () => {
    if (!isValidPositiveNumber(areaSqft)) {
      setError("Enter a valid paintable area greater than 0.");
      setShowResult(false);
      return;
    }
    setError(null);
    setShowResult(true);
  };

  const assistanceHref = `/assistance?area=${Math.round(areaSqft)}&product=${encodeURIComponent(paintType)}&project=${projectType}&surface=${surface}&source=painting-cost-calculator`;
  const productsHref = surface === "interior" ? "/products?category=interior-paints" : "/products?category=exterior-paints-textures";

  return (
    <CalculatorShell
      eyebrow="Painting Cost Calculator"
      title="A Real Material + Labour Estimate"
      subtitle="Tell us about your project and we'll break the estimate down by paint, primer, putty and labour — not one opaque number."
      accent={ACCENT}
      icon={Wallet}
    >
      <div className="space-y-4 sm:space-y-5">
        {/* ── STEP 1 ── */}
        <StepSection step={1} title="What are you painting?" accent={ACCENT}>
          <div className="space-y-5">
            <ChoiceGrid cols={2}>
              <ChoiceCard
                selected={surface === "interior"}
                onClick={() => { setSurface("interior"); setPaintType(INTERIOR_PAINTS[0]); }}
                icon={Home}
                label="Interior"
                sublabel="Inside the home"
                accent={ACCENT}
              />
              <ChoiceCard
                selected={surface === "exterior"}
                onClick={() => { setSurface("exterior"); setPaintType(EXTERIOR_PAINTS[0]); }}
                icon={Sun}
                label="Exterior"
                sublabel="Outer walls & facade"
                accent={ACCENT}
              />
            </ChoiceGrid>

            <div className="pt-5 border-t border-[#F0EAE0]">
              <p className="text-[13px] font-bold text-charcoal mb-3">Project type</p>
              <ChoiceGrid cols={2}>
                <ChoiceCard
                  selected={projectType === "fresh"}
                  onClick={() => setProjectType("fresh")}
                  icon={Sparkles}
                  label="Fresh Painting"
                  sublabel="New or bare surface"
                  accent={ACCENT}
                />
                <ChoiceCard
                  selected={projectType === "repaint"}
                  onClick={() => setProjectType("repaint")}
                  icon={RefreshCw}
                  label="Re-Painting"
                  sublabel="Over existing paint"
                  accent={ACCENT}
                />
              </ChoiceGrid>
            </div>
          </div>
        </StepSection>

        {/* ── STEP 2 ── */}
        <StepSection
          step={2}
          title="How large is the area?"
          hint="Enter the total paintable surface area for the project."
          accent={ACCENT}
          action={<UnitToggle value={areaUnit} onChange={setAreaUnit} options={[["sqft", "Sq.ft"], ["sqm", "Sq.m"]]} />}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label-premium">Paintable Area ({AREA_UNIT_LABEL[areaUnit]})</label>
              <input
                type="text"
                inputMode="decimal"
                value={area}
                onChange={(e) => setArea(e.target.value.replace(/[^0-9.]/g, ""))}
                className="input-premium min-h-[48px]"
                placeholder="e.g. 1200"
              />
            </div>
            <div>
              <label className="label-premium">Number of Coats</label>
              <input
                type="text"
                inputMode="numeric"
                value={coats}
                onChange={(e) => setCoats(e.target.value.replace(/[^0-9]/g, ""))}
                className="input-premium min-h-[48px]"
              />
            </div>
          </div>
        </StepSection>

        {/* ── STEP 3 ── */}
        <StepSection step={3} title="Pick your product and finish level" accent={ACCENT}>
          <div className="space-y-5">
            <ChoiceGrid cols={2}>
              {paintOptions.map((p) => (
                <ChoiceCard
                  key={p}
                  selected={paintType === p}
                  onClick={() => setPaintType(p)}
                  icon={Paintbrush}
                  label={p}
                  accent={ACCENT}
                />
              ))}
            </ChoiceGrid>

            <div className="pt-5 border-t border-[#F0EAE0]">
              <p className="text-[13px] font-bold text-charcoal mb-3">Finish tier</p>
              <ChoiceGrid cols={3}>
                {TIERS.map((t) => (
                  <ChoiceCard
                    key={t.v}
                    selected={tier === t.v}
                    onClick={() => setTier(t.v)}
                    icon={t.icon}
                    label={t.label}
                    sublabel={t.sub}
                    accent={ACCENT}
                  />
                ))}
              </ChoiceGrid>
            </div>
          </div>
        </StepSection>

        {/* ── STEP 4 ── */}
        <StepSection step={4} title="What should we include?" hint="Toggle off anything you're sourcing separately." accent={ACCENT}>
          <div className="space-y-2.5">
            <Toggle label="Include primer" desc="Sealing coat before the topcoat" checked={includePrimer} onChange={setIncludePrimer} accent={ACCENT} />
            {projectType === "fresh" && (
              <Toggle label="Include wall putty" desc="Smoothing base for fresh surfaces" checked={includePutty} onChange={setIncludePutty} accent={ACCENT} />
            )}
            <Toggle label="Include labour" desc="Applied per sq.ft of painted area" checked={includeLabour} onChange={setIncludeLabour} accent={ACCENT} />
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

        <CalculateButton onClick={handleCalculate} label="Calculate Estimated Cost" accent={ACCENT} />

        <AnimatePresence>
          {showResult && breakdown && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 pt-2"
            >
              <ResultsHeader label="Your Cost Breakdown" accent={ACCENT} />

              <div className="bg-white border border-[#EDE6DA] rounded-2xl divide-y divide-[#F0EAE0] overflow-hidden">
                <CostRow label="Paint" sub={`${round1(breakdown.paintQtyLitres)} L`} value={formatINR(breakdown.paintCost)} accent={ACCENT} icon={Paintbrush} />
                {includePrimer && <CostRow label="Primer" sub={`${round1(breakdown.primerQtyLitres)} L`} value={formatINR(breakdown.primerCost)} accent="#8B9E7E" icon={Layers} />}
                {includePutty && projectType === "fresh" && <CostRow label="Wall Putty" sub={`${round1(breakdown.puttyQtyKg)} kg`} value={formatINR(breakdown.puttyCost)} accent="#C9A858" icon={Layers} />}
                {includeLabour && <CostRow label="Labour" sub={`${Math.round(areaSqft)} sq.ft`} value={formatINR(breakdown.labourCost)} accent="#8C6478" icon={Wallet} />}
              </div>

              <TotalPanel
                label="Estimated Project Cost"
                value={`${formatINR(breakdown.totalLow)} – ${formatINR(breakdown.totalHigh)}`}
                note="Shown as a ±10% band to reflect real variation in site conditions, surface preparation and local rates."
              />

              <HowCalculated
                rows={[
                  { label: "Area", value: `${Math.round(areaSqft)} sq.ft` },
                  { label: "Coats", value: String(coatsNum) },
                  { label: "Paint coverage", value: `${coverage} sq.ft/L (${paintType})${ratedSuffix(coverageRated.status)}` },
                  { label: "Paint rate", value: `${formatINR(PAINT_RATE_PER_LITRE[tier].value)}/L (${tier})${ratedSuffix(PAINT_RATE_PER_LITRE[tier].status)}` },
                  ...(includePrimer ? [{ label: "Primer coverage/rate", value: `${PRIMER_PUTTY.primerCoverageSqftPerLitre.value} sq.ft/L @ ${formatINR(PRIMER_PUTTY.primerRatePerLitre.value)}/L${ratedSuffix(PRIMER_PUTTY.primerRatePerLitre.status)}` }] : []),
                  ...(includePutty && projectType === "fresh" ? [{ label: "Putty coverage/rate", value: `${PRIMER_PUTTY.puttyCoverageSqftPerKg.value} sq.ft/kg @ ${formatINR(PRIMER_PUTTY.puttyRatePerKg.value)}/kg${ratedSuffix(PRIMER_PUTTY.puttyRatePerKg.status)}` }] : []),
                  ...(includeLabour ? [{ label: "Labour rate", value: `${formatINR(LABOUR_RATE_PER_SQFT[surface].value)}/sq.ft (${surface})${ratedSuffix(LABOUR_RATE_PER_SQFT[surface].status)}` }] : []),
                  { label: "Wastage buffer", value: `${Math.round((WASTAGE_FACTOR - 1) * 100)}%` },
                ]}
              />

              <CalculatorCTAs assistanceHref={assistanceHref} productsHref={productsHref} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-6 space-y-10">
          <CalculatorFAQ items={FAQ} />
          <RelatedTools currentHref="/calculators/painting-cost" />
          <DataDisclaimer />
        </div>
      </div>
    </CalculatorShell>
  );
}

function Toggle({
  label,
  desc,
  checked,
  onChange,
  accent,
}: {
  label: string;
  desc?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  accent: string;
}) {
  return (
    <label
      className={`flex items-center justify-between gap-4 cursor-pointer min-h-[60px] rounded-2xl border px-4 sm:px-5 transition-all ${
        checked ? "bg-white border-[#DCD2C2]" : "bg-[#FAF8F5] border-[#F0EAE0]"
      }`}
    >
      <span className="min-w-0">
        <span className="block text-[13.5px] font-bold text-charcoal leading-tight">{label}</span>
        {desc && <span className="block text-[11.5px] text-charcoal-muted mt-0.5">{desc}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative w-12 h-[26px] rounded-full transition-colors shrink-0"
        style={{ background: checked ? accent : "#E5DFD3" }}
      >
        <span
          className="absolute top-[3px] w-5 h-5 rounded-full bg-white shadow transition-transform"
          style={{ transform: checked ? "translateX(25px)" : "translateX(3px)" }}
        />
      </button>
    </label>
  );
}

function CostRow({
  label,
  sub,
  value,
  accent,
  icon: Icon,
}: {
  label: string;
  sub: string;
  value: string;
  accent: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${accent}14`, color: accent }}
      >
        <Icon className="w-4 h-4" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-bold text-charcoal leading-tight">{label}</p>
        <p className="text-[11.5px] text-charcoal-muted mt-0.5">{sub}</p>
      </div>
      <p className="text-[15px] font-bold text-charcoal shrink-0">{value}</p>
    </div>
  );
}
