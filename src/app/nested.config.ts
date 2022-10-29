import { TableConfigInterface, TableSelections } from './table/table.interface';

export const NestedConfig: TableConfigInterface = {
  caption: "User's friends",
  columns: [
    {
      label: 'Name',
      alias: 'name',
    },
  ],
  selection: TableSelections.Multiple,
};
