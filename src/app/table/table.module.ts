import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { GetValueByPathPipe } from './table.pipes';

@NgModule({
  declarations: [TableComponent, GetValueByPathPipe],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
