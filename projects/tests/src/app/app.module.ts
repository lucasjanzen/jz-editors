import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JZFormModule, JZTextEditorModule } from 'jz-editors';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, JZTextEditorModule, JZFormModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
