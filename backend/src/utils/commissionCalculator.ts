export const calculateCommission = (order: any, orders: any[]) => {
  let commission = 0;
  const orderDate = new Date(order.orderDate);
  const orderPrice = order.total;
  const sameDayOrders = orders.filter(o => {
    const oDate = new Date(o.orderDate);
    return oDate.getDate() === orderDate.getDate() && oDate.getMonth() === orderDate.getMonth() && oDate.getFullYear() === orderDate.getFullYear();
  })
  const sameDayOrderCount = sameDayOrders.length;
  const isWeekend = orderDate.getDay() === 5 || orderDate.getDay() === 6;
  const isWeekday = !isWeekend;
  const isNight = orderDate.getHours() >= 20;
  const isDay = !isNight;
  const isWeekdayNight = isWeekday && isNight;
  const isWeekdayDay = isWeekday && isDay;
  const isWeekendDay = isWeekend && isDay;
  const isWeekendNight = isWeekend && isNight;

  if (isWeekdayDay) {
    commission = orderPrice * 0.03;
  } else if (isWeekdayNight) {
    const first100 = Math.min(orderPrice, 100);
    const remaining = orderPrice - first100;
    commission = first100 * 0.03 + remaining * 0.05;
  } else if (isWeekendDay) {
    commission = Math.min(orderPrice * sameDayOrderCount, 50);
  } else if (isWeekendNight) {
    commission = orderPrice * 0.03;
    if (commission > 50) {
      commission = 50;
    }
  }

  return commission;
}
