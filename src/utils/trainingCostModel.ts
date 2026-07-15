export interface TrainingCostInputs {
  learners: number;
  seatCost: number;
  years: number;
  growthPercent: number;
  buildCost: number;
}

export interface TrainingCostResult {
  learners: number;
  seatCost: number;
  years: number;
  growthPercent: number;
  buildCost: number;
  annualSubscriptionCosts: number[];
  subscriptionTotal: number;
  difference: number;
}

const MAX_MONEY_INPUT = 1_000_000_000;

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateTrainingCostModel(
  inputs: TrainingCostInputs
): TrainingCostResult {
  const learners = clamp(
    Math.round(finiteOr(inputs.learners, 1)),
    1,
    100_000
  );
  const seatCost = clamp(
    finiteOr(inputs.seatCost, 0),
    0,
    MAX_MONEY_INPUT
  );
  const years = clamp(Math.round(finiteOr(inputs.years, 1)), 1, 10);
  const growthPercent = clamp(
    finiteOr(inputs.growthPercent, 0),
    -100,
    500
  );
  const buildCost = clamp(
    finiteOr(inputs.buildCost, 0),
    0,
    MAX_MONEY_INPUT
  );

  let learnersThisYear = learners;
  const annualSubscriptionCosts: number[] = [];

  for (let year = 0; year < years; year += 1) {
    annualSubscriptionCosts.push(learnersThisYear * seatCost);
    learnersThisYear = Math.max(
      0,
      Math.round(learnersThisYear * (1 + growthPercent / 100))
    );
  }

  const subscriptionTotal = annualSubscriptionCosts.reduce(
    (sum, annualCost) => sum + annualCost,
    0
  );

  return {
    learners,
    seatCost,
    years,
    growthPercent,
    buildCost,
    annualSubscriptionCosts,
    subscriptionTotal,
    difference: subscriptionTotal - buildCost
  };
}
