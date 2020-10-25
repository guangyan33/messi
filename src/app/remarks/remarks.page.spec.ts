import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemarksPage } from './remarks.page';

describe('RemarksPage', () => {
  let component: RemarksPage;
  let fixture: ComponentFixture<RemarksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemarksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
