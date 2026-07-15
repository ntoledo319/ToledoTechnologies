import { describe, expect, it } from 'vitest';
import { calculateTrainingCostModel } from '../utils/trainingCostModel';

describe('training cost model', () => {
  it('normalizes non-finite and negative inputs into a finite model', () => {
    const result = calculateTrainingCostModel({
      learners: Number.POSITIVE_INFINITY,
      seatCost: Number.NEGATIVE_INFINITY,
      years: Number.NaN,
      growthPercent: Number.POSITIVE_INFINITY,
      buildCost: -50
    });

    expect(result).toMatchObject({
      learners: 1,
      seatCost: 0,
      years: 1,
      growthPercent: 0,
      buildCost: 0,
      annualSubscriptionCosts: [0],
      subscriptionTotal: 0,
      difference: 0
    });
  });

  it('rounds count inputs and preserves finite decimal money inputs', () => {
    const result = calculateTrainingCostModel({
      learners: 10.6,
      seatCost: 12.5,
      years: 2.4,
      growthPercent: 0,
      buildCost: 125.75
    });

    expect(result.learners).toBe(11);
    expect(result.years).toBe(2);
    expect(result.annualSubscriptionCosts).toEqual([137.5, 137.5]);
    expect(result.difference).toBe(149.25);
  });

  it('produces one annual row for a one-year comparison', () => {
    const result = calculateTrainingCostModel({
      learners: 100,
      seatCost: 200,
      years: 1,
      growthPercent: 25,
      buildCost: 15_000
    });

    expect(result.annualSubscriptionCosts).toEqual([20_000]);
    expect(result.subscriptionTotal).toBe(20_000);
    expect(result.difference).toBe(5_000);
  });

  it('clamps extreme growth and money inputs to published maxima', () => {
    const result = calculateTrainingCostModel({
      learners: 2,
      seatCost: 2_000_000_000,
      years: 2,
      growthPercent: 9_000,
      buildCost: 2_000_000_000
    });

    expect(result.growthPercent).toBe(500);
    expect(result.seatCost).toBe(1_000_000_000);
    expect(result.buildCost).toBe(1_000_000_000);
    expect(result.annualSubscriptionCosts).toEqual([
      2_000_000_000,
      12_000_000_000
    ]);
  });

  it('never allows negative learner growth to produce a negative cohort', () => {
    const result = calculateTrainingCostModel({
      learners: 3,
      seatCost: 100,
      years: 3,
      growthPercent: -500,
      buildCost: 0
    });

    expect(result.growthPercent).toBe(-100);
    expect(result.annualSubscriptionCosts).toEqual([300, 0, 0]);
  });
});
