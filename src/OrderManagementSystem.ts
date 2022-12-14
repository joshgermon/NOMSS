import fs from 'fs';
import { Inventory, Product } from './Inventory.js';

export type OrdersAndInventory = {
	products: Product[];
	orders: Order[];
};

enum OrderStatus {
	Pending = 'Pending',
	Fulfilled = 'Fulfilled',
	Unfulfillable = 'Unfulfillable'
}

export interface Order {
	orderId: number;
	status: OrderStatus;
	dateCreated: string;
	items: OrderItem[];
}

export interface OrderItem {
	orderId: number;
	productId: number;
	quantity: number;
	costPerItem: number;
}

class OrderManagementSystem {
	private inventory: Inventory;
	private orders: Order[];

	// Read in JSON data to create Orders and new Inventory of products
	constructor() {
		const fileRead = fs.readFileSync('./data.json', 'utf-8');
		const data: OrdersAndInventory = JSON.parse(fileRead);
		this.inventory = new Inventory(data.products);
		this.orders = data.orders;
	}

	findOrders(orderIds: number[]): Order[] {
		return this.orders.filter((order) => orderIds.includes(order.orderId));
	}

	processOrders(orderIds: number[]): number[] {
		// Find matching orders
		const matchingOrders = this.findOrders(orderIds);
		if (matchingOrders.length <= 0) {
			console.log('No Matching Orders Found.');
			return orderIds;
		}
		// Iterate over each matching order & process their items according to Inventory stock levels
		const unfulfillableOrders: number[] = [];
		matchingOrders.forEach((order) => {
			console.log(`🔃  Commenced Processing of Order # ${order.orderId}`);
			const itemsProcessed = this.inventory.sellProducts(order.items);
			if (itemsProcessed) {
				order.status = OrderStatus.Fulfilled;
				console.log(
					`✅  - Order #${order.orderId} has been successfully fulfilled.`
				);
			} else {
				order.status = OrderStatus.Unfulfillable;
				console.log(
					`❌  - Order #${order.orderId} cannot be fulfilled due to stock levels. Order status set to "Unfulfilled".`
				);
				unfulfillableOrders.push(order.orderId);
			}
			console.log('*****************************************');
		});
		if (unfulfillableOrders.length <= 0) {
			console.log('✅  - All Orders were processed successfully.');
		} else {
			console.log(
				`⚠️  - Some orders were unable to be fulfilled due to stock levels. Please review the following orders: ${unfulfillableOrders}`
			);
		}
		// Return orders that were unable to be fulfilled due to stock levels
		return unfulfillableOrders;
	}
}

export default OrderManagementSystem;
