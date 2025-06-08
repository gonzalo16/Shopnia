import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

interface QueryParams{
  limit?: number,
  offset?: number,
  gender?: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpClient = inject(HttpClient);

 
  public getProducts(options: QueryParams) :Observable<ProductsResponse>{
    const {limit = 12, offset = 0, gender = ''} = options;

    return this.httpClient.get<ProductsResponse>(`${baseUrl}/products`,{
      params:{
        limit: limit,
        offset: offset,
        gender: gender,
      }
    }).pipe(tap((resp) => console.log(resp)));
  }

  public getProductByIdSlug(idSlug:string):Observable<Product>{
    return this.httpClient.get<Product>(`${baseUrl}/products/${idSlug}`);
  }

} 
