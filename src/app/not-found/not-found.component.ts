import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Routes } from '../routes';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  protected readonly Routes = Routes;
}
