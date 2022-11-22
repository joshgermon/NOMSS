import 'jest';
import OrderManagementSystem from '../src/OrderManagementSystem';

describe('Test Order Fulfilment', () => {
	// New OMS instance created for each test as per requirements state should not persist
	test('Process all orders should return all unfulfilled orders', () => {
		const nomss = new OrderManagementSystem();
		expect(nomss.processOrders([1122, 1123, 1124, 1125])).toEqual([
			1123, 1124, 1125
		]);
	});
	test('Process single fulfillable order should return no unfulfilled orders', () => {
		const nomss = new OrderManagementSystem();
		expect(nomss.processOrders([1122])).toEqual([]);
	});
	test('Process single unfulfillable order should return self', () => {
		const nomss = new OrderManagementSystem();
		expect(nomss.processOrders([1125])).toEqual([1125]);
	});
	test('Process subset of orders should return single unfilfilled order', () => {
		const nomss = new OrderManagementSystem();
		expect(nomss.processOrders([1122, 1125])).toEqual([1125]);
	});
	test('Process invalid order ids should return empty array', () => {
		const nomss = new OrderManagementSystem();
		expect(nomss.processOrders([2221, 2222])).toEqual([]);
	});
});