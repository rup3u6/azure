import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageServiceVirtualRefComponent } from './message-service-virtual-ref.component';

describe('MessageServiceVirtualRefComponent', () => {
  let component: MessageServiceVirtualRefComponent;
  let fixture: ComponentFixture<MessageServiceVirtualRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageServiceVirtualRefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageServiceVirtualRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
