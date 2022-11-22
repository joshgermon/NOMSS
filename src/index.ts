import OrderManagementSystem from './OrderManagementSystem.js';

(function main() {
	const NOMSS = new OrderManagementSystem();
	// Edit order id array here to test order fulfilment.
	NOMSS.processOrders([1122, 1123, 1124, 1125]);
})();

