// Utils Imports
import { LocationInterface } from '../../types';
// Css Imports
import styles from './Table.css';

/**
 * Interface of Table component
 * mapSize - The size of the map
 */
interface TableProperties {
  mapSize: LocationInterface | undefined;
}

/**
 * Display Table React component
 * @param props Table properties
 * @returns Table React component
 */
export const Table = (props: TableProperties): JSX.Element => {
  const { mapSize } = props;
  return (
    <>
      {mapSize ? (
        <table className={styles.table}>
          <tbody>{generateCells(mapSize.y, <Row rowsNumber={mapSize.x} />)}</tbody>
        </table>
      ) : (
        <p>No selected file so no map generated</p>
      )}
    </>
  );
};

/**
 * Interface of Table component
 * rowsNumber - number of the rows to display
 */
interface RowProperties {
  rowsNumber: number;
}

/**
 * Display Row React component
 * @param props Row properties
 * @returns Row React component
 */
const Row = (props: RowProperties) => {
  return <tr>{generateCells(props.rowsNumber, <Cell />)}</tr>;
};

/**
 * Display Cell React component
 * @param props Cell properties
 * @returns Cell React component
 */
const Cell = () => {
  return <td className={styles.td} data-testid="cell"></td>;
};

/**
 *
 * @param iterator number of iteration to do with the loop
 * @param componentToRender the component to display
 * @returns React component with one or mulitple cells/rows
 */
const generateCells = (iterator: number, componentToRender: JSX.Element): JSX.Element => {
  let cells: JSX.Element[] = [];
  for (let indexBis = 0; indexBis < iterator; indexBis++) {
    cells.push(componentToRender);
  }
  return <>{cells}</>;
};
