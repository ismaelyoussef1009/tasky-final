import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  LocalStore = localStorage;

  set(key: string, data: any){
   try {
    this.LocalStore.setItem(key, JSON.stringify(data));
    return true
   } catch (error) {
    return false
   }
  }

  get(key: string){
    try {
      const response = JSON.parse(this.LocalStore.getItem(key) ?? '') ;
      return{
        status: true,
        data: response
      }
    } catch (error) {
      return{
        status: false,
        data: null
      }
    }
  }
}