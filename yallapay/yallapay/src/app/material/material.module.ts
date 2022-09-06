import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

const MaterialComponents = [
  MatToolbarModule,
  MatTableModule,
  MatIconModule
];

@NgModule({
  imports: [MaterialComponents ],
  exports:[MaterialComponents ]
})
export class MaterialModule { }
