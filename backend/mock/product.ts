export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  img?: string;
}

export const productList = [
  {
    id: 1,
    name: "Tissue",
    price: 150,
    description: "test1",
  },
  {
    id: 2,
    name: "NoteBook",
    price: 150,
    description: "test2",
  },
  {
    id: 3,
    name: "TV",
    price: 400,
    description: "test3",
    img: "product_tv.jpg",
  },
];
