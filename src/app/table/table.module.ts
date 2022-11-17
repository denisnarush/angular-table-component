import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { GetMapValueByKeyPipe, GetValueByPathPipe } from './table.pipes';
import { CheckAllStatusDirective } from './table.directives';

@NgModule({
  declarations: [
    TableComponent,
    GetValueByPathPipe,
    GetMapValueByKeyPipe,
    CheckAllStatusDirective,
  ],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
