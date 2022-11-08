import { TableConfigInterface, TableSelections } from './table/table.interface';

export const SimpleConfig: TableConfigInterface = {
  caption: 'Users',
  columns: [
    {
      label: 'Name',
      alias: 'name',
      width: '12em',
    },
    {
      label: 'Email',
      alias: 'email',
    },
    {
      label: 'Gender',
      alias: 'gender',
      width: '0',
    },
    {
      label: 'Balance',
      alias: 'balance',
      width: '0',
    },
  ],
  uniqIdKey: 'id',
  selection: TableSelections.Multiple,
};
