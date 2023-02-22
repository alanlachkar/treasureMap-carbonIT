// React imports
import { render, cleanup, screen } from '@testing-library/react';
// Component imports
import { TreasureMap } from './TreasureMap';
// Utils imports
import '@testing-library/jest-dom';
import { getByText } from '@testing-library/dom';

afterEach(cleanup);

let container: HTMLElement;
const fileContent =
  'C - 3 - 4\r\nM - 1 - 0\r\nM - 2 - 1\r\nT - 0 - 3 - 2\r\nT - 1 - 3 - 3\r\nA - Lara - 1 - 1 - S - AADADAGGA\r\n';

describe('TreasureMap component suites tests', () => {
  beforeEach(() => {
    const component = render(<TreasureMap fileContent={fileContent} />);
    container = component.container;
  });
  test('Verify displayed', () => {
    expect(container).toBeInTheDocument();
    expect(screen.getAllByTestId('cell').length).toEqual(12);
  });
});
