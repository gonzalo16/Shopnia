import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel.component";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent { 

  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);

  productSlug:string = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    request:() => ({idSlug:this.productSlug}),
    loader:({request}) => {
      return this.productService.getProductByIdSlug(request.idSlug);
    }
  })
  
}
