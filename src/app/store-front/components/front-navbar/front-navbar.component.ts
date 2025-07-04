import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-front-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './front-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontNavbarComponent { }
