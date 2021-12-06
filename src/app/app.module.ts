import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialsModule } from './custom-materials.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSortModule } from '@angular/material';
import { LoadingComponent } from './componentes/loading/loading.component';
import { MessageComponent } from './componentes/message/message.component';
import { SearchComponent } from './componentes/search/search.component';
import { OnlyNumbersDirective } from './directive/only-numbers.directive';

@NgModule({
  declarations: [    
    AppComponent,
    OnlyNumbersDirective,
    LoadingComponent,
    MessageComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialsModule,
    HttpClientModule,
    MatSortModule    
  ],
  entryComponents: [   
    MessageComponent,
    LoadingComponent
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
