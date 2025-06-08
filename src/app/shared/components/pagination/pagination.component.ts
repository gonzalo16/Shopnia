import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  

  pagesCountSignal = input(0);
  currentPageSignal = input<number>(1);

  pageActive = signal(this.currentPageSignal());

  getPagesPagition = computed(() => {
    return Array.from({ length: this.pagesCountSignal() }, (_, i) => i + 1);
  })

}
