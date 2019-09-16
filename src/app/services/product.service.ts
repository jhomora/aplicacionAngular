import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Product } from "../components/models/product";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productCollection: AngularFirestoreCollection;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(public db: AngularFirestore) {
    //this.products = this.db.collection('products').valueChanges();
    this.productCollection = this.db.collection('products');
    this.products = this.productCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Product;
            data.id = a.payload.doc.id;
            return data;
        })
    }));
   }

   getProducts(){
     return this.products;
   }

   addProduct(product: Product){
     this.productCollection.add(product);
   }

   deleteProduct(product: Product){
      this.productDoc = this.db.doc(`products/${product.id}`);
      this.productDoc.delete();
   }

   updateProduct(product: Product){
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.update(product);
   }
}
