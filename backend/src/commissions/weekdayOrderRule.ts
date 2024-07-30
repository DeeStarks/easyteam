import { CommissionRule } from './commissionRule';

export class WeekdayOrderRule implements CommissionRule {
    calculate(order: any, _: any[]): number {
        let commission = 0;
        const orderDate = new Date(order.orderDate);
        const orderPrice = order.total;
        const isWeekday = orderDate.getDay() !== 5 && orderDate.getDay() !== 6;

        if (isWeekday) {
            commission = orderPrice * 0.03;
        }

        return commission;
    }
}
