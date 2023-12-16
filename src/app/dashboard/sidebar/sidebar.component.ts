import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Routes } from '../../routes';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) currentRoute = '';
  @Output() isOpenEvent = new EventEmitter<boolean>();

  constructor(private readonly router: Router) {}

  closeSidebar() {
    this.isOpenEvent.emit(false);
  }

  protected readonly Routes = Routes;
}
