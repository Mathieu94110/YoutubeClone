import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { HomePage, SigninPage, SearchPage, WatchPage } from '@/pages';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'signin', element: <SigninPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'video/:id', element: <WatchPage /> },
    ],
  },
]);
