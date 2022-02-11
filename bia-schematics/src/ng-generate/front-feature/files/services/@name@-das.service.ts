import { Injectable, Injector } from '@angular/core';
import { @Name@ } from '../model/@name@';
import { AbstractDas } from 'src/app/core/bia-core/services/abstract-das.service';

@Injectable({
  providedIn: 'root'
})
export class @Name@Das extends AbstractDas<@Name@> {
  constructor(injector: Injector) {
    super(injector, '@Plurialname@');
  }
}
