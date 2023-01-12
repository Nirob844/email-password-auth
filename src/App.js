
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginRB from './components/LoginRB/LoginRB';
import RegisterRB from './components/Register/RegisterRB/RegisterRB';
import Main from './layout/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <RegisterRB></RegisterRB>
      },
      {
        path: '/register',
        element: <RegisterRB></RegisterRB>
      },
      {
        path: '/login',
        element: <LoginRB></LoginRB>
      },
    ]
  },
])

function App() {
  return (
    <div className="">

      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
