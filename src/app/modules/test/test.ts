import { Component } from '@angular/core';
import { ApiHandlerService } from '../../core/http/api-handler-service';

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrl: './test.scss',
  standalone: false
})
export class Test {
  constructor(private snackbar: ApiHandlerService) {}

  onSuccess(): void {
    this.snackbar.showSuccess('Test Success', 60000);
  }

  onFailure(): void {
    this.snackbar.showError('Test Error', 60000);
  }

}
