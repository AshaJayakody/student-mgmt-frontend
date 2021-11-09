import { Injectable } from '@angular/core';
import { NotificationService as nt } from "@progress/kendo-angular-notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notificationService: nt) { }

  public show(msg: string): void {
    this.notificationService.show({
      content: msg,
      cssClass: "button-notification",
      animation: { type: "slide", duration: 400 },
      position: { horizontal: "center", vertical: "bottom" },
      type: { style: "success", icon: true },
      closable: true,
    });
  }
}
