"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList, Home, Sun, Sparkles, RefreshCw,
  Gem, Award, Coins,
} from "lucide-react";
import {
  CalculatorShell,
  DataDisclaimer,
  HowCalculated,
  ResultStat,
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
  PRIMER_PUTTY,
  PAINT_RATE_PER_LITRE,
  PAINTING_SYSTEM,
  resolveCoverage,
} from "@/src/lib/calculators/calculatorConfig";
import { formatINR, isValidPositiveNumber, ratedSuffix, round1 } from "@/src/lib/calculators/calculatorUtils";
import { areaToSqft, type AreaUnit, AREA_UNIT_LABEL } from "@/src/lib/calculators/units";

type Surface = "interior" | "exterior";
type ProjectType = "fresh" | "repaint";
type Tier = "economy" | "premium" | "luxury";

const ACCENT = "#8C6478";

const TIERS: { v: Tier; label: string; sub: string; icon: React.ElementType }[] = [
  { v: "economy", label: "Economy", sub: "Budget-friendly", icon: Coins },
  { v: "premium", label: "Premium", sub: "Best balance", icon: Award },
  { v: "luxury", label: "Luxury", sub: "Top-of-range", icon: Gem },
];

const FAQ = [
  {
    q: "What is a painting 'system'?",
    a: "It's the full stack of products applied in sequence rather than just the topcoat. On a fresh surface that typically means putty to smooth the wall, primer to seal and bind it, then the finish coat. Skipping layers is the most common reason a paint job fails early.",
  },
  {
    q: "Do I need putty on a repaint?",
    a: "Usually not. If the existing surface is sound and even, you can go straight to spot-priming and the topcoat — which is why the repaint system here starts with surface preparation instead of a full putty layer.",
  },
  {
    q: "Does this include labour?",
    a: "No — this is a material-only estimate for the full system. If you want labour factored in, use the Painting Cost calculator, which has a labour toggle.",
  },
  {
    q: "Why does the primer quantity differ from the topcoat quantity?",
    a: "Primer and topcoat have different coverage rates, and primer is applied as a single coat while the topcoat is normally two. Each layer is sized independently against your area rather than assumed to be the same.",
  },
];

export default function ProductRequirementCalculatorPage() {
  const [surface, setSurface] = useState<Surface>("interior");
  const [projectType, setProjectType] = useState<ProjectType>("fresh");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqft");
  const [area, setArea] = useState("");
  const [tier, setTier] = useState<Tier>("premium");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const areaSqft = areaToSqft(parseFloat(area) || 0, areaUnit);
  const paintType = surface === "interior" ? "Interior Emulsion" : "Exterior Emulsion";
  const coverageRated = resolveCoverage(paintType);
  const coverage = coverageRated.value;

  const system = useMemo(() => {
    if (areaSqft <= 0) return null;
    const steps: { step: string; label: string; qty: string; cost: number }[] = [];
    let total = 0;

    if (projectType === "fresh") {
      const puttyQty = (areaSqft * WASTAGE_FACTOR) / PRIMER_PUTTY.puttyCoverageSqftPerKg.value;
      const puttyCost = puttyQty * PRIMER_PUTTY.puttyRatePerKg.value;
      total += puttyCost;
      steps.push({ step: "01", label: "Wall Putty", qty: `${round1(puttyQty)} kg`, cost: puttyCost });
    }

    const primerQty = (areaSqft * WASTAGE_FACTOR) / PRIMER_PUTTY.primerCoverageSqftPerLitre.value;
    const primerCost = primerQty * PRIMER_PUTTY.primerRatePerLitre.value;
    total += primerCost;
    steps.push({ step: String(steps.length + 1).padStart(2, "0"), label: projectType === "fresh" ? "Primer" : "Primer (where needed)", qty: `${round1(primerQty)} L`, cost: primerCost });

    const paintQty = (areaSqft * DEFAULT_COATS * WASTAGE_FACTOR) / coverage;
    const paintCost = paintQty * PAINT_RATE_PER_LITRE[tier].value;
    total += paintCost;
    steps.push({ step: String(steps.length + 1).padStart(2, "0"), label: paintType, qty: `${round1(paintQty)} L`, cost: paintCost });

    return { steps, total };
  }, [areaSqft, projectType, coverage, paintType, tier]);

  const handleCalculate = () => {
    if (!isValidPositiveNumber(areaSqft)) {
      setError("Enter a valid surface area greater than 0.");
      setShowResult(false);
      return;
    }
    setError(null);
    setShowResult(true);
  };

  const assistanceHref = `/assistance?area=${Math.round(areaSqft)}&surface=${surface}&project=${projectType}&source=product-requirement-calculator`;
  const productsHref = surface === "interior" ? "/products?category=interior-paints" : "/products?category=exterior-paints-textures";
  const systemLabel = PAINTING_SYSTEM[projectType];

  return (
    <CalculatorShell
      eyebrow="Product Requirement Calculator"
      title="Your Complete Painting System"
      subtitle="A guided, layer-by-layer estimate — from surface preparation through to topcoat — sized to your actual area."
      accent={ACCENT}
      icon={ClipboardList}
    >
      <div className="space-y-4 sm:space-y-5">
        {/* ── STEP 1 ── */}
        <StepSection step={1} title="Where are you painting?" accent={ACCENT}>
          <div className="space-y-5">
            <ChoiceGrid cols={2}>
              <ChoiceCard
                selected={surface === "interior"}
                onClick={() => setSurface("interior")}
                icon={Home}
                label="Interior"
                sublabel="Inside the home"
                accent={ACCENT}
              />
              <ChoiceCard
                selected={surface === "exterior"}
                onClick={() => setSurface("exterior")}
                icon={Sun}
                label="Exterior"
                sublabel="Outer walls & facade"
                accent={ACCENT}
              />
            </ChoiceGrid>

            <div className="pt-5 border-t border-[#F0EAE0]">
              <p className="text-[13px] font-bold text-charcoal mb-3">Surface condition</p>
              <ChoiceGrid cols={2}>
                <ChoiceCard
                  selected={projectType === "fresh"}
                  onClick={() => setProjectType("fresh")}
                  icon={Sparkles}
                  label="New / Fresh"
                  sublabel="Needs the full system"
                  accent={ACCENT}
                />
                <ChoiceCard
                  selected={projectType === "repaint"}
                  onClick={() => setProjectType("repaint")}
                  icon={RefreshCw}
                  label="Repaint"
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
          accent={ACCENT}
          action={<UnitToggle value={areaUnit} onChange={setAreaUnit} options={[["sqft", "Sq.ft"], ["sqm", "Sq.m"]]} />}
        >
          <div className="sm:max-w-sm">
            <label className="label-premium">Surface Area ({AREA_UNIT_LABEL[areaUnit]})</label>
            <input
              type="text"
              inputMode="decimal"
              value={area}
              onChange={(e) => setArea(e.target.value.replace(/[^0-9.]/g, ""))}
              className="input-premium min-h-[48px]"
              placeholder="e.g. 1200"
            />
          </div>
        </StepSection>

        {/* ── STEP 3 ── */}
        <StepSection step={3} title="What finish level are you after?" accent={ACCENT}>
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

        <CalculateButton onClick={handleCalculate} label="Build My Painting System" accent={ACCENT} />

        <AnimatePresence>
          {showResult && system && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 pt-2"
            >
              <ResultsHeader label="Your Painting System" accent={ACCENT} />

              <ResultStat value={`${Math.round(areaSqft).toLocaleString()} sq.ft`} label="Surface Area" accent={ACCENT} />

              {/* layered system timeline */}
              <div className="relative space-y-3">
                {system.steps.map((s, i) => (
                  <div key={s.step} className="relative">
                    {i < system.steps.length - 1 && (
                      <span
                        className="absolute left-[35px] top-[62px] bottom-[-14px] w-px"
                        style={{ background: `${ACCENT}33` }}
                      />
                    )}
                    <div className="relative bg-white border border-[#EDE6DA] rounded-2xl p-5 flex items-center gap-4">
                      <span
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-serif font-bold text-[15px]"
                        style={{ background: `${ACCENT}16`, color: ACCENT, fontFamily: "var(--font-cormorant)" }}
                      >
                        {s.step}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-charcoal leading-tight">{s.label}</p>
                        <p className="text-[12px] text-charcoal-muted mt-0.5">Estimated requirement: {s.qty}</p>
                      </div>
                      <p className="text-[15px] font-bold text-charcoal shrink-0">{formatINR(s.cost)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <TotalPanel
                label="Estimated Material Cost"
                value={formatINR(system.total)}
                note="Materials only — labour is not included in this system estimate."
              />

              <HowCalculated
                rows={[
                  { label: "System used", value: systemLabel.map((s) => s.label).join(" → ") },
                  { label: "Paint coverage", value: `${coverage} sq.ft/L (${paintType}, ${DEFAULT_COATS} coats)${ratedSuffix(coverageRated.status)}` },
                  { label: "Paint rate", value: `${formatINR(PAINT_RATE_PER_LITRE[tier].value)}/L (${tier})${ratedSuffix(PAINT_RATE_PER_LITRE[tier].status)}` },
                  { label: "Primer coverage", value: `${PRIMER_PUTTY.primerCoverageSqftPerLitre.value} sq.ft/L${ratedSuffix(PRIMER_PUTTY.primerCoverageSqftPerLitre.status)}` },
                  ...(projectType === "fresh" ? [{ label: "Putty coverage", value: `${PRIMER_PUTTY.puttyCoverageSqftPerKg.value} sq.ft/kg${ratedSuffix(PRIMER_PUTTY.puttyCoverageSqftPerKg.status)}` }] : []),
                  { label: "Wastage buffer", value: `${Math.round((WASTAGE_FACTOR - 1) * 100)}%` },
                ]}
              />

              <CalculatorCTAs assistanceHref={assistanceHref} productsHref={productsHref} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-6 space-y-10">
          <CalculatorFAQ items={FAQ} />
          <RelatedTools currentHref="/calculators/product-requirement" />
          <DataDisclaimer />
        </div>
      </div>
    </CalculatorShell>
  );
}
