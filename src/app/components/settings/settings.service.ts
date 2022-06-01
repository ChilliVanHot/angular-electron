import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    private _activeSideMenu$ = new BehaviorSubject<string>('neuron');
    public activeSideMenu$ = this._activeSideMenu$.asObservable();
constructor() { }
public setSideMenu(menuName: string) {
    this._activeSideMenu$.next(menuName);
}
}
