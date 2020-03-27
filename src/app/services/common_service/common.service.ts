import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { WindowRefService } from '../window/window.service';
@Injectable({
  providedIn: 'root'
})

export class CommonService  {
  responseData =  new BehaviorSubject<any>({});
  modifiedCCLC = new BehaviorSubject<any>({});
  paramObj;
  private window: Window;
  constructor(
    private sanitizer: DomSanitizer,
    private windowRef: WindowRefService,
  ) {
    this.window = this.windowRef.nativeWindow;
  }
  // Fuction will return  a observable for Serach Result
  getApiRespose(): Observable<any> {
    return this.responseData.asObservable();
  };
  getModifiedCCLC(): Observable<any> {
    return this.modifiedCCLC.asObservable();
  };
  getCcLcSeo(cclc) {
    if (this.paramObj && this.paramObj.lang) {
      const retVal = cclc.trim().toLowerCase() === 'cc'
        ? this.paramObj.lang.split('-')[1]
        : this.paramObj.lang.split('-')[0];
        return retVal;
    }
  }
  getCcLc(cclc) {
    if (typeof this.window !== 'undefined') {
    return cclc.trim().toLowerCase() === 'cc'
    ? this.window.location.pathname.split('/')[1].split('-')[1]
    : this.window.location.pathname.split('/')[1].split('-')[0];
    } else {
    return cclc.trim().toLowerCase() === 'cc' ? 'us' : 'en';
    }
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
