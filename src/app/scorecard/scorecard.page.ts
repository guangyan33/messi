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
  RevenueActual: any[] = [];
  RevenueKPI: any[] = [];
  MeetRevenueTA: any[] = [];
  FinancialFirstType
  Financial: any[] = [];
  FinancialType: any[] = [];
  FinancialTotal: any[] = [];
  OperationKPI: any[] = [];
  OperationKPIType: any[] = [];
  DigitalisationKPI: any[] = [];
  CustomerKPI: any[] = [];
  CustomerTarget: any[] = [];
  Customerpercentage: any[] = [];
  PeopleKPI: any[] = [];
  ProductKPI: any[] = [];
  OPEXTarget: any[] = [];
  OPEXActual: any[] = [];
  CapexTarget: any[] = [];
  CapexActual: any[] = [];
  OpertaionKPITarget: any[] = [];
  OpertaionKPIActual: any[] = [];
  headerRow: any[] = [];
  SRevenueTarget: any[] = [];
  SRevenueActual: any[] = [];
  MRevenueTarget: any[] = [];
  MRevenueActual: any[] = [];
  MPTarget: any[] = [];
  MPActual: any[] = [];
  MOpexTarget: any[] = [];
  MOpexActual: any[] = [];
  MCapexTarget: any[] = [];
  MCapexActual: any[] = [];
  MOKPIMTarget: any[] = [];
  MOKPIMActual: any[] = [];
  MOKPIYTarget: any[] = [];
  MOKPIYActual: any[] = [];
  DSMARTPTarget: any[] = [];
  DSMARTPActual: any[] = [];
  getSelectedMonth: any;
  a: number;
  counter = 0;

  addCounter(e:number) {
    this.counter += 1;
    return this.counter;
  } 


  constructor(private http: HttpClient,
    private papa: Papa,
    private plt: Platform,
    private file: File) {
    this.Revenue();
    this.Target();
    this.TelcoFinance();
    this.TelcoCAPEX();
    this.OpsKPI();
    this.ScoreCard();
  }

  ngOnInit() {
  }

  month() {
    this.a = this.getSelectedMonth + 1;
    for (let i = 16; this.a < i; i--) {

      console.log(this.a);
      // console.log(i);
      // return [i];
    }
  }

  private Revenue() {
    this.http.get('../../assets/Revenue.csv', {
      responseType: 'text'
    })
      .subscribe(
        data => this.extractRevenue(data),
        err => console.log('something went wrong: ', err)
      );
  }
  private Target() {
    this.http.get('../../assets/Target.csv', {
      responseType: 'text'
    })
      .subscribe(
        data => this.extractTarget(data),
        err => console.log('something went wrong: ', err)
      );
  }
  private TelcoFinance() {
    this.http.get('../../assets/TelcoFinance.csv', {
      responseType: 'text'
    })
      .subscribe(
        data => this.extractTelcoFinance(data),
        err => console.log('something went wrong: ', err)
      );
  }
  private TelcoCAPEX() {
    this.http.get('../../assets/TelcoCAPEX.csv', {
      responseType: 'text'
    })
      .subscribe(
        data => this.extracttTelcoCAPEX(data),
        err => console.log('something went wrong: ', err)
      );
  }
  private OpsKPI() {
    this.http.get('../../assets/OpsKPI.csv', {
      responseType: 'text'
    })
      .subscribe(
        data => this.extracttOpsKPI(data),
        err => console.log('something went wrong: ', err)
      );
  }
  private ScoreCard() {
    this.http.get('../../assets/Scorecard.csv', {
      responseType: 'text'
    })
      .subscribe(
        data => this.extracttScoreCard(data),
        err => console.log('something went wrong: ', err)
      );
  }

  private extractTarget(res) {
    let Financial = res || '';
    this.papa.parse(Financial, {
      complete: parsedData => {
        // this.headerRow = parsedData.data.splice(0, 1)[0];
        this.FinancialFirstType = parsedData.data.splice(5, 1);
        this.Financial = parsedData.data.splice(5, 8);
        // this.FinancialType = parsedData.data.splice(10, 1);
        this.OperationKPI = parsedData.data.splice(6, 1);
        this.OperationKPIType = parsedData.data.splice(7, 1);
        this.DigitalisationKPI = parsedData.data.splice(8, 10);
        this.CustomerKPI = parsedData.data.splice(8, 1);
        this.Customerpercentage = parsedData.data.splice(19, 1);
        this.PeopleKPI = parsedData.data.splice(19, 2);
        this.ProductKPI = parsedData.data.splice(19, 1);
      }
    });
  }
  private extractRevenue(res) {
    let RevenueData = res || '';

    this.papa.parse(RevenueData, {
      complete: parsedData => {
        // this.headerRow = parsedData.data.splice(0, 1)[0];
        this.RevenueKPI = parsedData.data.splice(0, 1);
        this.RevenueData = parsedData.data.splice(15, 1);
        this.RevenueActual = parsedData.data.splice(15, 1);
        this.MeetRevenueTA = parsedData.data.splice(40, 2);
        // this.RevenueData = parsedData.data.splice(0,10)[0];
      }
    });
  }
  private extractTelcoFinance(res) {
    let OPEXTarget = res || '';

    this.papa.parse(OPEXTarget, {
      complete: parsedData => {
        // this.headerRow = parsedData.data.splice(0, 1)[0];
        this.OPEXTarget = parsedData.data.splice(10, 1);
        this.OPEXActual = parsedData.data.splice(10, 1);
       
      }
    });
  }
  private extracttTelcoCAPEX(res) {
    let OPEXTarget = res || '';

    this.papa.parse(OPEXTarget, {
      complete: parsedData => {
        // this.headerRow = parsedData.data.splice(0, 1)[0];
        this.CapexTarget = parsedData.data.splice(2, 1);
        this.CapexActual = parsedData.data.splice(2, 1);
      }
    });
  }
  private extracttOpsKPI(res) {
    let OpertaionKPITarget = res || '';

    this.papa.parse(OpertaionKPITarget, {
      complete: parsedData => {
        // this.headerRow = parsedData.data.splice(0, 1)[0];
        this.OpertaionKPITarget = parsedData.data.splice(5, 52);
        this.OpertaionKPIActual = parsedData.data.splice(2, 1);
        this.CustomerTarget = parsedData.data.splice(2, 20);
      }
    });
  }
  private extracttScoreCard(res) {
    let MeetRevenueTarget = res || '';

    this.papa.parse(MeetRevenueTarget, {
      complete: parsedData => {
        // this.headerRow = parsedData.data.splice(0, 1)[0];
        this.SRevenueTarget = parsedData.data.splice(3, 1);
        this.SRevenueActual = parsedData.data.splice(3, 1);
        this.MRevenueTarget = parsedData.data.splice(3, 1);
        this.MRevenueActual = parsedData.data.splice(3, 1);
        this.MPTarget = parsedData.data.splice(3, 1);
        this.MPActual = parsedData.data.splice(3, 1);
        this.MOpexTarget = parsedData.data.splice(3, 1);
        this.MOpexActual = parsedData.data.splice(3, 1);
        this.MCapexTarget = parsedData.data.splice(3, 1);
        this.MCapexActual = parsedData.data.splice(3, 1);
        this.MOKPIMTarget = parsedData.data.splice(3, 1);
        this.MOKPIMActual = parsedData.data.splice(3, 1);
        this.MOKPIYTarget = parsedData.data.splice(3, 1);
        this.MOKPIYActual = parsedData.data.splice(3, 1);
        this.DSMARTPTarget = parsedData.data.splice(3, 1);
        this.DSMARTPActual = parsedData.data.splice(3, 1);
      }
    });
  }


}
