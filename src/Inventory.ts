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

	sellProduct(productId: number, quantity: number) {
		const product = this.getProduct(productId);
		if (!product) {
			return 'Product Not Found';
		}
		if (product.quantityOnHand - quantity < 0) {
			this.reorderProduct(product.productId);
			return 'Not Enough Stock';
		}
		product.quantityOnHand -= quantity;
		if (product.quantityOnHand <= product.reorderThreshold) {
			this.reorderProduct(product.productId);
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
