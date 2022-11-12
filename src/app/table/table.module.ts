import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { GetMapValueByKeyPipe, GetValueByPathPipe } from './table.pipes';

@NgModule({
  declarations: [TableComponent, GetValueByPathPipe, GetMapValueByKeyPipe],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
