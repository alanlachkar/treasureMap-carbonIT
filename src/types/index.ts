import { ECardinalPoint } from 'src/utils/enums/enums';

/**
 * Interface about location
 * x - horizontal axis
 * y - vertical axis
 */
interface LocationInterface {
  x: number;
  y: number;
}

/**
 * Interface about treasure
 * numberOfTreasure - number of the treasure in the location
 */
interface TreasureInterface extends LocationInterface {
  numberOfTreasure: number;
}

/**
 * Interface about adventurer
 * name     - Name of the adventurer
 * oriented - Orientation at the begining of the scenario
 * path     - The path the adventurer will take during the scenario
 */
interface AdventurerInterface extends TreasureInterface {
  name: string;
  oriented: ECardinalPoint;
  path: string;
}

export { AdventurerInterface, LocationInterface, TreasureInterface };
