import { Product } from "../src/entities";

export const productList: Product[] = [
  {
    id: 1,
    name: "Tissue",
    price: 150,
    description: "test1",
    createBy: "admin",
    weightPriority: 1,
  },
  {
    id: 2,
    name: "NoteBook",
    price: 500,
    description: "test2",
    createBy: "admin",
    weightPriority: 2,
  },
  {
    id: 3,
    name: "TV",
    price: 400,
    description: "test3",
    img: "product_tv.jpg",
    createBy: "admin",
    weightPriority: 3,
  },
  {
    id: 4,
    name: "Book",
    price: 120,
    description: "test4",
    createBy: "admin",
    weightPriority: 4,
  },
  {
    id: 5,
    name: "Iphone",
    price: 3200,
    createBy: "admin",
    weightPriority: 5,
  },
];
