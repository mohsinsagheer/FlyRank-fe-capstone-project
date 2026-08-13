import { SpeedInsights } from '@vercel/speed-insights/react';
import { MainLayout } from './views/layout/MainLayout';
import './styles/main.css';

export function App() {
  return (
    <>
      <MainLayout />
      <SpeedInsights />
    </>
  );
}

export default App;
