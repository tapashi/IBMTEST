import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common_service/common.service';
import { Router } from '@angular/router';
import { WindowRefService } from '../services/window/window.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  cc:string;
  lc:string;
  private window: Window;
  constructor(
    private commonService: CommonService,
    private router: Router,
    private windowRef: WindowRefService,
  ) {
    this.window = this.windowRef.nativeWindow;
  }
  ngOnInit(){
    console.log(this.cc, 'this.cc---');
    this.cc = this.commonService.getCcLc('cc');
    this.lc = this.commonService.getCcLc('lc');
  }
  navigateToPage(pageName= null){
    if(pageName) {
      this.router.navigate([`${this.lc}-${this.cc}/${pageName}`]);
    } else {
      this.router.navigate([`${this.lc}-${this.cc}`]);
    }
    
  }
  changeCCLC(cc, lc){
    let pageName ;
    const ccLcObj = {
      cc: cc,
      lc: lc
    };
    this.commonService.modifiedCCLC.next(ccLcObj);
    if(this.window && this.window.location.pathname.split('/')[2]!=='undefined'){
      pageName = this.window.location.pathname.split('/')[2];
    }
    if (pageName) {
      this.router.navigate([`${lc}-${cc}/pageName`]);
    } else {
      this.router.navigate([`${lc}-${cc}`]);
    }
  }
}
