import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomEntranceComponent } from './chat-room-entrance.component';

describe('ChatRoomEntranceComponent', () => {
  let component: ChatRoomEntranceComponent;
  let fixture: ComponentFixture<ChatRoomEntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRoomEntranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
