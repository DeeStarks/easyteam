import { CommissionRule } from './commissionRule';

export class WeekdayNightOrderRule implements CommissionRule {
    calculate(order: any, _: any[]): number {
        let commission = 0;
        const orderDate = new Date(order.orderDate);
        const orderPrice = order.total;
        const isWeekday = orderDate.getDay() !== 5 && orderDate.getDay() !== 6;
        const isNight = orderDate.getHours() >= 20;
        const isWeekdayNight = isWeekday && isNight;

        if (isWeekdayNight) {
            const first100 = Math.min(orderPrice, 100);
            const remaining = orderPrice - first100;
            commission = first100 * 0.03 + remaining * 0.05;
        }

        return commission;
    }
}
