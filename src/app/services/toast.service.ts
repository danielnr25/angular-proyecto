import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

 constructor(private messageService: MessageService) {}

    showInfoViaToast(message:string, summary:string='Info') {
      this.messageService.add({ severity: 'info', summary, detail: message });
    }

    showWarnViaToast(message:string, summary:string='Warning') {
      this.messageService.add({ severity: 'warn', summary, detail: message });
    }

    showErrorViaToast(message:string, summary:string='Error') {
      this.messageService.add({ severity: 'error', summary, detail: message });
    }

    showSuccessViaToast(message:string, summary:string='Success') {
      this.messageService.add({ severity: 'success', summary, detail: message });
    }

    showToast(severity:'success'|'warn'|'info'|'error',summary:string,message:string){
      this.messageService.add({ severity, summary, detail: message });
    }
}
