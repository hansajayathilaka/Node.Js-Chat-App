import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat-room-entrance',
  templateUrl: './chat-room-entrance.component.html',
  styleUrls: ['./chat-room-entrance.component.css']
})
export class ChatRoomEntranceComponent implements OnInit {

  entranceForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.entranceForm = this.fb.group({
      userName: ['', Validators.required, Validators.minLength(3)],
      chatRoom: ['', Validators.required, Validators.minLength(3)]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.entranceForm.valid) {
      // Navigate to chat room
    }
  }

  get entranceFormControl() {
    return this.entranceForm.controls;
  }

}
