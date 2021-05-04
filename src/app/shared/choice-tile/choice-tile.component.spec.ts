import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceTileComponent } from './choice-tile.component';

describe('ChoiceTileComponent', () => {
  let component: ChoiceTileComponent;
  let fixture: ComponentFixture<ChoiceTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
