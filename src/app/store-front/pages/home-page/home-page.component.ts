import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductService } from '../../../products/services/product.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

  serviceProduct = inject(ProductService);
  paginationService = inject(PaginationService);
  

  productsResource = rxResource({
    request: () => ({page:this.paginationService.currentPage() - 1}),
    loader: ({ request }) => {
      return this.serviceProduct.getProducts({
        offset:request.page * 12
      });
    }
  });
}
