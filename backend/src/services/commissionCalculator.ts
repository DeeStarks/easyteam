import { CommissionRule } from '../commissions/commissionRule';
import { WeekdayOrderRule } from '../commissions/weekdayOrderRule';
import { WeekdayNightOrderRule } from '../commissions/weekdayNightOrderRule';
import { WeekendOrderRule } from '../commissions/weekendOrderRule';

export class CommissionCalculator {
    private rules: CommissionRule[];

    constructor() {
        this.rules = [
            new WeekdayOrderRule(),
            new WeekdayNightOrderRule(),
            new WeekendOrderRule(),
        ];
    }

    calculate(order: any, allOrders: any[]): number {
        return this.rules.reduce((total, rule) => total + rule.calculate(order, allOrders), 0);
    }
}
