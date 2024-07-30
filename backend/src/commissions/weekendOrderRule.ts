import { CommissionRule } from './commissionRule';

export class WeekendOrderRule implements CommissionRule {
    calculate(order: any, allOrders: any[]): number {
        let commission = 0;
        const orderDate = new Date(order.orderDate);
        const orderPrice = order.total;
        const sameDayOrders = allOrders.filter(o => {
            const oDate = new Date(o.orderDate);
            return oDate.getDate() === orderDate.getDate() && oDate.getMonth() === orderDate.getMonth() && oDate.getFullYear() === orderDate.getFullYear();
        })
        const sameDayOrderCount = sameDayOrders.length;
        const isWeekend = orderDate.getDay() === 5 || orderDate.getDay() === 6;
        const isWeekendDay = isWeekend && orderDate.getHours() < 20;
        const isWeekendNight = isWeekend && !isWeekendDay;

        if (isWeekendDay) {
            commission = Math.min(orderPrice * sameDayOrderCount, 50);
        } else if (isWeekendNight) {
            commission = orderPrice * 0.03;
            if (commission > 50) {
                commission = 50;
            }
        }

        return commission;
    }
}
