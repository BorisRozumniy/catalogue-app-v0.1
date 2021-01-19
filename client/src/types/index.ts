export interface IProduct {
  _id: string
  img: string,
  title: string,
  description: string,
  price: string,
  numberDaysUntilEndDiscount: number,
};

export interface RootState {
  productsReducer: {
    productsData: Array<IProduct>;
    editingProduct: IProduct;
    productsRequestLoading: boolean;
  }
};
  