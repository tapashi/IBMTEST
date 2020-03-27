import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../../services/common_service/common.service';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<void> = new Subject();
  episodeList:any;
  cc:string;
  lc:string;
  seasonList=[];
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
        this.episodeList = data.episodeList ? _.mapValues(_.groupBy(data.episodeList, 'season'),
        array => array.map(list => list)): null;
        console.log(this.episodeList);
        let objProps = Object.keys(this.episodeList);
        for (let prop of objProps) { 
          this.seasonList.push(this.episodeList[prop]);
      }
      }  else {
        this.router.navigate([`${this.lc}-${this.cc}`]);
      }
      })
  }
  
  ngOnDestroy() {
    this.destroySubject$.next();
  }
}

