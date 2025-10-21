import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStore {
  private dataSource = new BehaviorSubject<any>(null);

  // Observable for components to subscribe to
  data$ = this.dataSource.asObservable();

  // Method to update the store
  setData(data: any) {
    this.dataSource.next(data);
  }

  // Method to get the latest value (synchronously)
  getData(): any {
    return this.dataSource.value;
  }
}