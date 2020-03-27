
import { Injectable } from '@angular/core';

function getWindowObj(): any {
   // Return the global Window object
   if (typeof window !== 'undefined') {
      return window;
   }
}

@Injectable({
    providedIn: 'root'
})
export class WindowRefService {
   get nativeWindow(): any {
      return getWindowObj();
   }
}
