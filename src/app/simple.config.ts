import {
  TableConfigInterface,
  TableActions,
  TableConfigSortingOrders,
} from './table/table.interface';

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
      width: '6em',
    },
  ],
  uniqIdKey: 'id',
  selection: TableActions.Multiple,
  nesting: true,
  sorting: {
    type: TableActions.Single,
    columns: [
      {
        alias: 'name',
        order: TableConfigSortingOrders.Asc,
      },
      {
        alias: 'email',
        order: TableConfigSortingOrders.Asc,
      },
    ],
  },
};
