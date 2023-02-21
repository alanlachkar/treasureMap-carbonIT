import { ECardinalPoint, ETypeOfCase } from 'src/utils/enums/enums';

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
 * Interface about adventurer
 * name     - Name of the adventurer
 * oriented - Orientation at the begining of the scenario
 * path     - The path the adventurer will take during the scenario
 * typeOfCase - type of the case
 */
interface CaseInterface extends LocationInterface {
  name?: string;
  oriented?: ECardinalPoint;
  numberOfTreasure?: number;
  path?: string;
  typeOfCase: ETypeOfCase;
}

export { CaseInterface, LocationInterface };
