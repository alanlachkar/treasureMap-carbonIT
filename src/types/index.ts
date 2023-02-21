import { ECardinalPoint } from 'src/utils/enums/enums';

interface LocationInterface {
  x: number;
  y: number;
}

interface TreasureInterface extends LocationInterface {
  numberOfTreasure: number;
}

interface AdventurerInterface extends TreasureInterface {
  name: string;
  oriented: ECardinalPoint;
  path: string;
}

export { AdventurerInterface, LocationInterface, TreasureInterface };
