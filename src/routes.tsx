import { createBrowserRouter } from 'react-router-dom';

import GermanyStations from "./pages/GermanyStations";

const router = createBrowserRouter([
  {
    path: '/',
    element: <GermanyStations></GermanyStations>,
   
  },

]);

export default router;
