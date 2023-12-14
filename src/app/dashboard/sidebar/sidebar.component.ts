import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input({ required: true }) isOpen = false;
  @Output() isOpenEvent = new EventEmitter<boolean>();

  closeSidebar() {
    this.isOpenEvent.emit(false);
  }
}
