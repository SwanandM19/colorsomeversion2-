"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Waves, Building2, ShowerHead, Sun, Home, Container,
  Sparkles, Wrench,
} from "lucide-react";
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
  WATERPROOFING_SURFACES,
  WATERPROOFING_RATE_PER_KG,
  WATERPROOFING_REPAIR_MULTIPLIER,
  PACK_SIZES_KG,
} from "@/src/lib/calculators/calculatorConfig";
import { optimizePackCombination, formatINR, isValidPositiveNumber, ratedSuffix, round1 } from "@/src/lib/calculators/calculatorUtils";
import { areaToSqft, type AreaUnit, AREA_UNIT_LABEL } from "@/src/lib/calculators/units";

type Condition = "new" | "repair";

const ACCENT = "#8B9E7E";

const SURFACE_ICONS: Record<string, React.ElementType> = {
  "terrace-roof": Building2,
  bathroom: ShowerHead,
  "exterior-wall": Sun,
  "interior-wall": Home,
  "water-tank": Container,
};

const FAQ = [
  {
    q: "Does this include labour?",
    a: "No — this calculator estimates waterproofing material only. For an estimate that includes application labour, use the Painting Cost calculator or request a quote for your specific site.",
  },
  {
    q: "Why does a repair job need more material?",
    a: "Existing damage — cracks, blistering, previously failed coatings — absorbs more material and usually needs extra sealing before the main system goes on. A standard allowance is added on top of the base consumption for repair and renovation work.",
  },
  {
    q: "Which surface should I pick?",
    a: "Choose the one closest to what you're treating. Consumption differs meaningfully between them: a terrace takes considerably more material per square foot than an interior wall, because it faces standing water and direct sun.",
  },
  {
    q: "How do I measure a terrace or roof?",
    a: "Measure the flat surface area you intend to coat (length × width). If you're also treating the parapet or upstand around the edges, add that wall area too — those junctions are where leaks most commonly start.",
  },
];

export default function WaterproofingCalculatorPage() {
  const [surfaceKey, setSurfaceKey] = useState<typeof WATERPROOFING_SURFACES[number]["key"]>(WATERPROOFING_SURFACES[0].key);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqft");
  const [area, setArea] = useState("");
  const [condition, setCondition] = useState<Condition>("new");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const surface = WATERPROOFING_SURFACES.find((s) => s.key === surfaceKey)!;
  const areaSqft = areaToSqft(parseFloat(area) || 0, areaUnit);

  const result = useMemo(() => {
    if (areaSqft <= 0) return null;
    const multiplier = condition === "repair" ? WATERPROOFING_REPAIR_MULTIPLIER : 1;
    const requiredKg = areaSqft * surface.consumptionKgPerSqft.value * multiplier;
    const pack = optimizePackCombination(requiredKg, PACK_SIZES_KG);
    const cost = pack.totalPurchased * WATERPROOFING_RATE_PER_KG.value;
    return { requiredKg, pack, cost, multiplier };
  }, [areaSqft, surface, condition]);

  const handleCalculate = () => {
    if (!isValidPositiveNumber(areaSqft)) {
      setError("Enter a valid surface area greater than 0.");
      setShowResult(false);
      return;
    }
    setError(null);
    setShowResult(true);
  };

  const assistanceHref = `/assistance?area=${Math.round(areaSqft)}&surface=${encodeURIComponent(surface.label)}&condition=${condition}&source=waterproofing-calculator`;

  return (
    <CalculatorShell
      eyebrow="Waterproofing Calculator"
      title="Estimate Your Waterproofing Requirement"
      subtitle="Select your surface type and area to get a material quantity and a practical pack-size recommendation."
      accent={ACCENT}
      icon={Waves}
    >
      <div className="space-y-4 sm:space-y-5">
        {/* ── STEP 1 ── */}
        <StepSection
          step={1}
          title="What are you waterproofing?"
          hint="Consumption varies by surface — a terrace needs more material per sq.ft than an interior wall."
          accent={ACCENT}
        >
          <ChoiceGrid cols={5}>
            {WATERPROOFING_SURFACES.map((s) => (
              <ChoiceCard
                key={s.key}
                selected={surfaceKey === s.key}
                onClick={() => setSurfaceKey(s.key)}
                icon={SURFACE_ICONS[s.key] ?? Waves}
                label={s.label}
                accent={ACCENT}
              />
            ))}
          </ChoiceGrid>
        </StepSection>

        {/* ── STEP 2 ── */}
        <StepSection step={2} title="What's the condition of the surface?" accent={ACCENT}>
          <ChoiceGrid cols={2}>
            <ChoiceCard
              selected={condition === "new"}
              onClick={() => setCondition("new")}
              icon={Sparkles}
              label="New Construction"
              sublabel="Sound, untreated surface"
              accent={ACCENT}
            />
            <ChoiceCard
              selected={condition === "repair"}
              onClick={() => setCondition("repair")}
              icon={Wrench}
              label="Repair / Renovation"
              sublabel="Existing damage or leaks"
              accent={ACCENT}
            />
          </ChoiceGrid>
        </StepSection>

        {/* ── STEP 3 ── */}
        <StepSection
          step={3}
          title="How large is the surface?"
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
              placeholder="e.g. 800"
            />
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

        <CalculateButton onClick={handleCalculate} label="Calculate Requirement" accent={ACCENT} />

        <AnimatePresence>
          {showResult && result && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 pt-2"
            >
              <ResultsHeader accent={ACCENT} />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <ResultStat value={`${Math.round(areaSqft).toLocaleString()}`} label="Surface Area (sq.ft)" accent={ACCENT} />
                <ResultStat value={`${round1(result.requiredKg)} kg`} label="Material Required" accent="#C9A858" />
                <ResultStat value={formatINR(result.cost)} label="Est. Material Cost" accent="#C4704B" />
              </div>

              <PackPanel combo={result.pack.combo} unit="kg" leftover={round1(result.pack.leftover)} accent={ACCENT} />

              <HowCalculated
                rows={[
                  { label: "Surface type", value: surface.label },
                  { label: "Condition", value: condition === "repair" ? "Repair (+15% allowance)" : "New construction" },
                  { label: "Consumption rate", value: `${surface.consumptionKgPerSqft.value} kg/sq.ft (${surface.coats} coats)${ratedSuffix(surface.consumptionKgPerSqft.status)}` },
                  { label: "Material rate", value: `${formatINR(WATERPROOFING_RATE_PER_KG.value)}/kg${ratedSuffix(WATERPROOFING_RATE_PER_KG.status)}` },
                  { label: "Formula", value: "Area × Consumption Rate × Condition Factor" },
                ]}
              />

              <CalculatorCTAs assistanceHref={assistanceHref} productsHref="/products?category=waterproofing-construction" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-6 space-y-10">
          <CalculatorFAQ items={FAQ} />
          <RelatedTools currentHref="/calculators/waterproofing" />
          <DataDisclaimer />
        </div>
      </div>
    </CalculatorShell>
  );
}
