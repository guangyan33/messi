import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.page.html',
  styleUrls: ['./scorecard.page.scss'],
})
export class ScorecardPage implements OnInit {

  categories = ['Financial', 'Operations', 'Digitalisation',
    'Customer', 'People', 'Products'];

  RevenueData: any[] = [];
  RevenueKPI: any[] = [];
  FinancialFirstType
  Financial: any[] = [];
  FinancialType: any[] = [];
  FinancialTotal: any[] = [];
  headerRow: any[] = [];

  constructor(private http: HttpClient,
    private papa: Papa,
    private plt: Platform,
    private file: File) {
    this.Revenue();
    this.Target();
  }

  ngOnInit() {
  }

  private Revenue(){
    this.http.get('../../assets/Revenue.csv', {
      responseType: 'text'
    })
    .subscribe(
      data => this.extractRevenue(data),
      err => console.log('something went wrong: ', err)
    );
  }
  private Target(){
    this.http.get('../../assets/Target.csv', {
      responseType: 'text'
    })
    .subscribe(
      data => this.extractTarget(data),
      err => console.log('something went wrong: ', err)
    );
  }

  private extractTarget(res) {
    let Financial = res || '';
 
    this.papa.parse(Financial, {
      complete: parsedData => {
        // this.headerRow = parsedData.data.splice(0, 1)[0];
        this.FinancialFirstType = parsedData.data.splice(5,1);
        this.Financial = parsedData.data.splice(5,8);
        this.FinancialType = parsedData.data.splice(10,1);
      }
    });
  }
  private extractRevenue(res) {
    let RevenueData = res || '';
 
    this.papa.parse(RevenueData, {
      complete: parsedData => {
        // this.headerRow = parsedData.data.splice(0, 1)[0];
        this.RevenueKPI = parsedData.data.splice(0,1);
        this.RevenueData = parsedData.data.splice(15,1);
        // this.RevenueData = parsedData.data.splice(0,10)[0];
      }
    });
  }
}
