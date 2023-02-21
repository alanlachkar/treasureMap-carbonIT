// React imports
import { useState, useEffect } from 'react';
// Utils imports
import { AdventurerInterface, LocationInterface, TreasureInterface } from '../../types';
import { ECardinalPoint } from '../../utils/enums/enums';

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
  const [mountainsLocation, setMountainsLocation] = useState<LocationInterface[]>([]);
  const [treasures, setTreasures] = useState<TreasureInterface[]>([]);
  const [adventurers, setAdventurers] = useState<AdventurerInterface[]>([]);

  useEffect(() => {
    if (fileContent !== (null || undefined)) {
      // /!\ Reset states if the file changed
      getFileInformation(
        fileContent,
        setMapSize,
        setMountainsLocation,
        setTreasures,
        setAdventurers
      );
    }
  }, [fileContent]);

  return <></>;
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
  setMountainsLocation: React.Dispatch<React.SetStateAction<LocationInterface[]>>,
  setTreasures: React.Dispatch<React.SetStateAction<TreasureInterface[]>>,
  setAdventurers: React.Dispatch<React.SetStateAction<AdventurerInterface[]>>
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
        initializeMapSize(elementsLine, setMapSize);
        break;
      // Mountains' location
      case 'M':
        addMountainLocation(elementsLine, setMountainsLocation);
        break;
      // Treasure informations
      case 'T':
        addTreasure(elementsLine, setTreasures);
        break;
      // Adventurer informations
      case 'A':
        addAdventurer(elementsLine, setAdventurers);
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
  setAdventurers: React.Dispatch<React.SetStateAction<AdventurerInterface[]>>
): void => {
  const name: string = elementsLine[1];
  const xAdventurerLocation: number = Number(elementsLine[2]);
  const yAdventurerLocation: number = Number(elementsLine[3]);
  const oriented: ECardinalPoint = elementsLine[4] as ECardinalPoint;
  const path = elementsLine[5];
  setAdventurers((oldAdventurers: AdventurerInterface[]) => [
    ...oldAdventurers,
    {
      name,
      oriented,
      path,
      x: xAdventurerLocation,
      y: yAdventurerLocation,
      numberOfTreasure: 0
    }
  ]);
};

/**
 * Add a treasure to the state
 * @param elementsLine Treasure informations
 * @param setTreasures Function used to set location of each treasure in the file
 */
const addTreasure = (
  elementsLine: string[],
  setTreasures: React.Dispatch<React.SetStateAction<TreasureInterface[]>>
): void => {
  const xTreasuresLocation: number = Number(elementsLine[1]);
  const yTreasuresLocation: number = Number(elementsLine[2]);
  const numberOfTreasure: number = Number(elementsLine[3]);
  setTreasures((oldTreasures: TreasureInterface[]) => [
    ...oldTreasures,
    {
      x: xTreasuresLocation,
      y: yTreasuresLocation,
      numberOfTreasure
    }
  ]);
};

/**
 * Add a mountain to the state
 * @param elementsLine Location of the mountain
 * @param setMountainsLocation Function used to set location of each mountain in the file
 */
const addMountainLocation = (
  elementsLine: string[],
  setMountainsLocation: React.Dispatch<React.SetStateAction<LocationInterface[]>>
): void => {
  const xMountainLocation: number = Number(elementsLine[1]);
  const yMountainLocation: number = Number(elementsLine[2]);
  setMountainsLocation(
    (oldMoutainsLocation: LocationInterface[]): LocationInterface[] => [
      ...oldMoutainsLocation,
      {
        x: xMountainLocation,
        y: yMountainLocation
      }
    ]
  );
};

/**
 * Initialize the size of the map
 * @param elementsLine Size of the map
 * @param setMapSize Function used to set the size of the map
 */
const initializeMapSize = (
  elementsLine: string[],
  setMapSize: (mapSize: LocationInterface) => void
): void => {
  const xLocation: number = Number(elementsLine[1]);
  const yLocation: number = Number(elementsLine[2]);
  setMapSize({ x: xLocation, y: yLocation });
};
