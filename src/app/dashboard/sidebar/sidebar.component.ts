import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Routes } from '../../routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input({ required: true }) isOpen = false;
  @Output() isOpenEvent = new EventEmitter<boolean>();

  closeSidebar() {
    this.isOpenEvent.emit(false);
  }

  protected readonly Routes = Routes;
}
