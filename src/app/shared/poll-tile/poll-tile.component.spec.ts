import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollTileComponent } from './poll-tile.component';

describe('PollTileComponent', () => {
  let component: PollTileComponent;
  let fixture: ComponentFixture<PollTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
