import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { CommonService } from '../../services/common_service/common.service';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<void> = new Subject();
  episodeList:any;
  cc:string;
  lc:string;
  gallery=[];

  constructor(
    private commonService: CommonService,
    private router: Router
    ) {
    }

  ngOnInit() {
    this.cc = this.commonService.getCcLc('cc');
    this.lc = this.commonService.getCcLc('lc');
    this.commonService.getApiRespose().pipe(takeUntil(this.destroySubject$)).subscribe(data => {
      if (data && data.episodeList && data.episodeList.length> 0) {
        this.gallery = data.gallery ? data.gallery : [];
      }  else {
        this.router.navigate([`${this.lc}-${this.cc}`]);
      }
      })
  }
 
  ngOnDestroy() {
    this.destroySubject$.next();
  }
}

