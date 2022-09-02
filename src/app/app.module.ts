import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './features/task-schedules/delivery/event-list/event-list.component';
import { SchedulesComponent } from './features/task-schedules/delivery/schedules/schedules.component';

@NgModule({
  declarations: [AppComponent, EventListComponent, SchedulesComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
