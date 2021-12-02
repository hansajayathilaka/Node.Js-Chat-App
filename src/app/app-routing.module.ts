import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomEntranceComponent} from "./components/chat-room-entrance/chat-room-entrance.component";

const routes: Routes = [
  { component: ChatRoomEntranceComponent, path: 'entrance' },
  { path:'', redirectTo:'entrance', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
