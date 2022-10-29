import { TableConfigInterface, TableSelections } from './table/table.interface';

export const SimpleConfig: TableConfigInterface = {
  caption: 'Users',
  columns: [
    {
      label: '',
      alias: 'avatar',
      width: '0',
    },
    {
      label: 'Name',
      alias: 'name',
      width: '8em',
    },
    {
      label: 'Email',
      alias: 'email',
      width: '0',
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
  selection: TableSelections.Single,
  nesting: true,
};
