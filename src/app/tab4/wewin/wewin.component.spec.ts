import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WewinComponent } from './wewin.component';

describe('WewinComponent', () => {
  let component: WewinComponent;
  let fixture: ComponentFixture<WewinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WewinComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WewinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
