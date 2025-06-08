import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from '../../../products/services/product.service';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPageComponent {
  
  route = inject(ActivatedRoute);
  serviceProduct = inject(ProductService);

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender)
    )
  );

  
  productsResource = rxResource({
    request:() => ({gender: this.gender()}),
    loader:({request}) => {
      
      return this.serviceProduct.getProducts({
        gender:request.gender,
      });
    }
  });
}
