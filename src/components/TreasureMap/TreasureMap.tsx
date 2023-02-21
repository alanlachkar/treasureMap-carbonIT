// React imports
import { useState, useEffect } from 'react';
// Component imports
import { Table } from '../Table/Table';
// Utils imports
import { CaseInterface, LocationInterface } from '../../types';
import { ECardinalPoint, ETypeOfCase } from '../../utils/enums/enums';

/**
 * Interface for TreasureMap component
 * fileContent - Content of a selected file
 */
interface TreasureMapProps {
  fileContent: string | undefined;
}

/**
 * Display TreasureMap React component
 * @param props TreasureMap properties
 * @returns Table according to the fileContent pass through props
 */
export const TreasureMap = (props: TreasureMapProps): JSX.Element => {
  const { fileContent } = props;
  const [mapSize, setMapSize] = useState<LocationInterface | undefined>();
  const [mapContent, setMapContent] = useState<CaseInterface[]>([]);

  useEffect(() => {
    if (fileContent) {
      // TODO Reset states if the file changed
      getFileInformation(fileContent, setMapSize, setMapContent);
    }
  }, [fileContent]);

  return (
    <>
      {mapSize && (
        <p>
          The map size is : - {mapSize.x} horizontal; - {mapSize.y} vertical
        </p>
      )}
      <Table mapSize={mapSize} />
    </>
  );
};

/**
 * Get the information on the file and dispatch it according the first letter of each line
 * @param fileContent Content of the selected file
 * @param setMapSize Function used to update the size of the map
 * @param setMountainsLocation Function used to set location of each moutain in the file
 * @param setTreasures Function used to set location of each treasure in the file
 * @param setAdventurers Function used to set location of each adventurer in the file
 */
const getFileInformation = (
  fileContent: string,
  setMapSize: (mapSize: LocationInterface) => void,
  setMapContent: React.Dispatch<React.SetStateAction<CaseInterface[]>>
): void => {
  // Split each line
  const fileLines: string[] = fileContent.split('\r\n');

  fileLines.forEach((line: string) => {
    // Remove spaces between element of a line
    const concatenatedLine = line.replaceAll(' ', '');
    // Split the element informations due to '-' seperation
    const elementsLine = concatenatedLine.split('-');

    // Check the first element of each line to verify if it is the map, the location of a mountain or treasure or a adventurer
    switch (concatenatedLine[0]) {
      // Map informations
      case 'C':
        initializeMapSize(elementsLine, setMapSize, setMapContent);
        break;
      // Mountains' location
      case 'M':
        addMountainLocation(elementsLine, setMapContent);
        break;
      // Treasure informations
      case 'T':
        addTreasure(elementsLine, setMapContent);
        break;
      // Adventurer informations
      case 'A':
        addAdventurer(elementsLine, setMapContent);
        break;
      // Default case and in case of comment line in the file
      case '#':
      default:
        break;
    }
  });
};

/**
 * Add an adventurer to the state
 * @param elementsLine Adventurer informations
 * @param setAdventurers Function used to set location of each adventurer in the file
 */
const addAdventurer = (
  elementsLine: string[],
  setMapContent: React.Dispatch<React.SetStateAction<CaseInterface[]>>
): void => {
  const name: string = elementsLine[1];
  const xAdventurerLocation: number = Number(elementsLine[2]);
  const yAdventurerLocation: number = Number(elementsLine[3]);
  const oriented: ECardinalPoint = elementsLine[4] as ECardinalPoint;
  const path = elementsLine[5];
  updateMapContent(
    setMapContent,
    xAdventurerLocation,
    yAdventurerLocation,
    ETypeOfCase.TREASURE,
    0,
    { name, oriented, path }
  );
};

/**
 * Add a treasure to the state
 * @param elementsLine Treasure informations
 * @param setTreasures Function used to set location of each treasure in the file
 */
const addTreasure = (
  elementsLine: string[],
  setMapContent: React.Dispatch<React.SetStateAction<CaseInterface[]>>
): void => {
  const xTreasuresLocation: number = Number(elementsLine[1]);
  const yTreasuresLocation: number = Number(elementsLine[2]);
  const numberOfTreasure: number = Number(elementsLine[3]);
  updateMapContent(
    setMapContent,
    xTreasuresLocation,
    yTreasuresLocation,
    ETypeOfCase.TREASURE,
    numberOfTreasure
  );
};

/**
 * Add a mountain to the state
 * @param elementsLine Location of the mountain
 * @param setMountainsLocation Function used to set location of each mountain in the file
 */
const addMountainLocation = (
  elementsLine: string[],
  setMapContent: React.Dispatch<React.SetStateAction<CaseInterface[]>>
): void => {
  const xMountainLocation: number = Number(elementsLine[1]);
  const yMountainLocation: number = Number(elementsLine[2]);
  updateMapContent(
    setMapContent,
    xMountainLocation,
    yMountainLocation,
    ETypeOfCase.MOUTAIN
  );
};

/**
 * Initialize the size of the map
 * @param elementsLine Size of the map
 * @param setMapSize Function used to set the size of the map
 * @param setMapContent Function used to set the content of the map
 */
const initializeMapSize = (
  elementsLine: string[],
  setMapSize: (mapSize: LocationInterface) => void,
  setMapContent: React.Dispatch<React.SetStateAction<CaseInterface[]>>
): void => {
  const xLocation: number = Number(elementsLine[1]);
  const yLocation: number = Number(elementsLine[2]);
  setMapSize({ x: xLocation, y: yLocation });
  setMapContent(createDefaultMapContent(yLocation, xLocation));
};

/**
 * Create a default map
 * @param height Height of the map
 * @param width Width of the map
 * @returns A default map
 */
const createDefaultMapContent = (height: number, width: number): CaseInterface[] => {
  const cells: CaseInterface[] = [];
  for (let index = 0; index < height; index++) {
    for (let indexBis = 0; indexBis < width; indexBis++) {
      cells.push({
        x: indexBis + 1,
        y: index + 1,
        typeOfCase: ETypeOfCase.PLAIN
      });
    }
  }
  return cells;
};

/**
 * Function used to update mapContent state according to the given parameters
 * @param setMapContent Function used to update the state
 * @param xLocation Horizontal location
 * @param yLocation Vertical location
 * @param typeOfCase Type of the case
 * @param numberOfTreasure Number of treasure on this case
 * @param options
 *  - name The name of the adventurer
 *  - oriented The orientation of the adventurer
 *  - path The path the adventurer will take during the scenario
 */
function updateMapContent(
  setMapContent: React.Dispatch<React.SetStateAction<CaseInterface[]>>,
  xLocation: number,
  yLocation: number,
  typeOfCase: ETypeOfCase,
  numberOfTreasure?: number,
  options?: { name?: string; oriented?: ECardinalPoint; path?: string }
) {
  setMapContent((oldMapContent: CaseInterface[]): CaseInterface[] => {
    let newMapContent = oldMapContent;
    const foundCase = oldMapContent.find(
      (content: CaseInterface) => content.x === xLocation && content.y === yLocation
    );

    // Check if it is the default case
    if (foundCase && foundCase.typeOfCase === ETypeOfCase.PLAIN) {
      const index = newMapContent.findIndex(
        (element: CaseInterface) => element.x === xLocation && element.y === yLocation
      );
      // Replace the old case with the new one
      newMapContent.splice(index, 1, {
        x: xLocation,
        y: yLocation,
        typeOfCase,
        numberOfTreasure,
        name: options?.name,
        oriented: options?.oriented,
        path: options?.path
      });
    }
    return newMapContent;
  });
}
