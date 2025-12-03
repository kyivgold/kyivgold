import type { Product, Category } from '$lib/types/types';

interface AppState {
	products: Product[];
	categories: Category[];
}

const appData = $state<AppState>({
	products: [],
	categories: []
});

/**
 * @param products - Массив объектов Product.
 * @param categories - Массив объектов Category.
 */
export function loadAppData(products: Product[], categories: Category[]) {
	products.sort((a, b) => {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();

		if (nameA < nameB) {
			return -1; // a должно идти раньше b
		}
		if (nameA > nameB) {
			return 1; // b должно идти раньше a
		}
		return 0;
	});
	appData.products = products;
	appData.categories = categories;
}

export function getProducts(slug: string): Product[] {
	if (slug !== 'all') {
		return appData.products.filter((p) => p.categorySlug === slug);
	} else {
		return appData.products;
	}
}

export function getCategories(): Category[] {
	return appData.categories;
}
