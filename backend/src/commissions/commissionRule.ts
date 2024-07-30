export interface CommissionRule {
    calculate(order: any, allOrders: any[]): number;
}
