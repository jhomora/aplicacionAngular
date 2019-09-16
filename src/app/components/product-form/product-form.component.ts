import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from '../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  product = {} as Product;

  constructor(public productServices: ProductService) { }

  ngOnInit() {
  }

  addProduct(){
    if (this.product.name != '' && this.product.description != '' && this.product.preci != 0) {
      this.productServices.addProduct(this.product); 
      this.product = {} as Product;
    }
    
  }

}
