import React, { useEffect } from 'react'
import {
  Container,
  Button,
  Image,
  Menu,
  Table,
  Message,
  Segment,
  Icon,
  Sticky,
} from 'semantic-ui-react'

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    console.log("*** requestSort", key, sortConfig);
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(
    props.myUserErrorTypes
  )

  const getClassNamesFor = (id) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === id ? sortConfig.direction : undefined
  }

  const TABLE_HEADERS = [
  { name: "ID Number", id: "userNumber" },
  { name: "User Type", id: "userType" },
  { name: "User Category", id: "errorId" },
  { name: "User Interest", id: "errorCategory" }
];

  return (
    <Table>
      <caption>User Error Types</caption>
      <Table.Header>
        <Table.Row>
          {TABLE_HEADERS.map(({ name, id }) => (
            <Table.HeaderCell key={id}>
              <Button
                type="button"
                onClick={() => requestSort(id)}
                className={getClassNamesFor(id)}
              >
                {name}
              </Button>
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((error) => {
          const { userNumber, userType, errorId, errorCategory } = error
          return (
            <React.Fragment key={errorId}>
              <Table.Row id={errorId} key={errorId}>
                <Table.Cell>{userNumber}</Table.Cell>
                <Table.Cell>{userType}</Table.Cell>
                <Table.Cell>{errorId}</Table.Cell>
                <Table.Cell>{errorCategory}</Table.Cell>
              </Table.Row>
            </React.Fragment>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default ProductTable