import 'jest';
import OrderManagementSystem from '../src/OrderManagementSystem';

describe('Test Order Fulfilment', () => {
	let nomss: OrderManagementSystem;
	beforeEach(() => {
		// New OMS instance created for each test as per requirements state should not persist
		nomss = new OrderManagementSystem();
	});

	test('Process all orders should return all unfulfilled orders', () => {
		expect(nomss.processOrders([1122, 1123, 1124, 1125])).toEqual([
			1123, 1125
		]);
	});
	test('Process single fulfillable order should return no unfulfilled orders', () => {
		expect(nomss.processOrders([1122])).toEqual([]);
	});
	test('Process single unfulfillable order should return self', () => {
		expect(nomss.processOrders([1125])).toEqual([1125]);
	});
	test('Process subset of orders should return single unfilfilled order', () => {
		expect(nomss.processOrders([1122, 1125])).toEqual([1125]);
	});
	test('Process invalid order ids should return array of invalid orders', () => {
		expect(nomss.processOrders([2221, 2222])).toEqual([2221, 2222]);
	});
});