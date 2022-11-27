import { Inventory } from '../src/Inventory';
import TestData from '../data.json';

describe('Test Inventory Stock Levels', () => {
	let inventory: Inventory;
	beforeEach(() => {
		inventory = new Inventory(structuredClone(TestData.products));
	});

	test('Sell order with in stock products should decrease quantity', () => {
		inventory.sellProducts([
			{
				orderId: 1122,
				productId: 1,
				quantity: 4,
				costPerItem: 10.45
			},
			{
				orderId: 1122,
				productId: 2,
				quantity: 7,
				costPerItem: 20.95
			}
		]);
		expect(inventory.getProduct(1)?.quantityOnHand).toBe(46);
		expect(inventory.getProduct(2)?.quantityOnHand).toBe(3);
	});

	test('Sell order with 1 out of stock and 2 in stock products should not change any product quantities', () => {
		inventory.sellProducts([
			{
				orderId: 1125,
				productId: 1,
				quantity: 6,
				costPerItem: 10.45
			},
			{
				orderId: 1125,
				productId: 2,
				quantity: 8,
				costPerItem: 20.95
			},
			{
				orderId: 1125,
				productId: 3,
				quantity: 3,
				costPerItem: 20.95
			}
		]);
		expect(inventory.getProduct(1)?.quantityOnHand).toBe(50);
		expect(inventory.getProduct(2)?.quantityOnHand).toBe(10);
		expect(inventory.getProduct(3)?.quantityOnHand).toBe(0);
	});
});
