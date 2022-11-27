import { OrderItem } from './OrderManagementSystem';

export interface Product {
	productId: number;
	description: string;
	quantityOnHand: number;
	reorderThreshold: number;
	reorderAmount: number;
	deliveryLeadTime: number;
}

export class Inventory {
	private products: Product[];

	constructor(products: Product[]) {
		this.products = products;
	}

	getProduct(productId: number) {
		return this.products.find((product) => product.productId === productId);
	}

	canItemBeFulfilled({ productId, quantity }: OrderItem) {
		const product = this.getProduct(productId);
		if (!product) {
			console.log('Product Not Found.');
			return false;
		}
		if (product.quantityOnHand - quantity < 0) {
			this.reorderProduct(product.productId);
			console.log('Not Enough Stock');
			return false;
		}
		return true;
	}

	// Returns true for all orders fulfillable & false for unfulfillable order(s)
	sellProducts(orderItems: OrderItem[]) {
		const orderIsFulfillable = orderItems.every((item) =>
			this.canItemBeFulfilled(item)
		);
		if (!orderIsFulfillable) return false;
		for (const item of orderItems) {
			const product = this.getProduct(item.productId);
			if (!product) return false;
			// Sell product & decrease stock levels (reorder if threshold met)
			product.quantityOnHand -= item.quantity;
			if (product.quantityOnHand <= product.reorderThreshold) {
				this.reorderProduct(product.productId);
			}
		}
		return true;
	}

	// Implementation out of scope
	reorderProduct(productId: number) {
		const product = this.getProduct(productId);
		console.log(
			`Product stock threshold reached. Reordering ${product?.reorderAmount} products.`
		);
	}
}
