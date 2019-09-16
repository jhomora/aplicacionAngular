import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [];
  editingProduct: Product;
  editing:boolean = false;

  constructor(public productServices: ProductService) { }

  ngOnInit() {
    this.productServices.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(event, product){
    if (confirm('Desea eliminar el elemento?')) {
      this.productServices.deleteProduct(product);
    }    
  }

  editProduct(event, product){
    this.editingProduct = product;
    this.editing = !this.editing;
  }

  updateProduct(){
    this.productServices.updateProduct(this.editingProduct);
    this.editingProduct = {} as Product;
    this.editing = false;
  }

}
