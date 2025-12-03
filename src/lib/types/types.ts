export interface Product {
	id: string;
	name: string;
	description: string;
	imgUrl: string;
	categorySlug: string;
	price: number;
	promoPrice: number;
}

export interface Category {
	id: string;
	parentId: string;
	name: string;
	slug: string;
	imgUrl: string;
}

export interface InitData {
	products: Product[];
	categories: Category[];
}
