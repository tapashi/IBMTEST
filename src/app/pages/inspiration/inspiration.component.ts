import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/service_loader/http.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common_service/common.service';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.scss']
})
export class InspirationComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<void> = new Subject();
  language:string;
  cc:string;
  lc:string;
  dataObj:object;
  constructor(
    private http: HttpService,
    private commonService: CommonService,
    private route: ActivatedRoute
    ) {
    this.route.params
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(
      (params) => {
        this.commonService.paramObj = params;
        this.language = params['lang'];
        this.cc = this.commonService.getCcLcSeo('cc').toUpperCase();
        this.lc = this.commonService.getCcLcSeo('lc');
      }
    );
   }

  ngOnInit() {
    this.commonService.getModifiedCCLC().pipe(takeUntil(this.destroySubject$)).subscribe(data => {
      console.log(typeof data, 'data form printer-carousel.component');
        if (data.hasOwnProperty('cc') && data.hasOwnProperty('lc')) {
          this.cc = (data.cc).toUpperCase();
          this.lc = data.lc;
          this.getLinkText(this.cc, this.lc);
        }
    })
    this.getLinkText(this.cc, this.lc);
  }
  getLinkText(cc,lc): void {
    this.http
      .get(`/assets/data/${lc}_${cc}.json`)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((res: any) => {
        if (res) {
          this.dataObj = res;
          this.commonService.responseData.next(res);
          console.log(this.dataObj, 'this.dataObj---')
        } 
        // Error scenario not handled as it is mock data
      });
  }
  getVideoUrl (url){
    return this.commonService.transform(url);
  }
  ngOnDestroy() {
    this.destroySubject$.next();
  }
}

