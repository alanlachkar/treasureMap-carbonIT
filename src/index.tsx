// React imports
import { createRoot } from 'react-dom/client';
// Component imports
import MapPage from './pages/MapPage/MapPage';

const App = (): JSX.Element => {
  return <MapPage />;
};

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(<App />);
