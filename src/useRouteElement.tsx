import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './context/app.context'
import { Suspense, lazy, useContext } from 'react'
import path from 'src/constant/path'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function RejectedRoute() {
  const { isAuthenticated, user } = useContext(AppContext)
  return !isAuthenticated ? (
    <Outlet />
  ) : user?.Role == 'Employee' ? (
    <Navigate to={path.schedule} />
  ) : (
    <Navigate to={path.dashboard} />
  )
}

function AdminProtectedRoute() {
  const { user } = useContext(AppContext)
  return user?.Role == '1' ? <Outlet /> : <Navigate to='/' />
}

function ManagerProtectedRoute() {
  const { user } = useContext(AppContext)
  return user?.Role == '1' ? <Outlet /> : <Navigate to='/' />
}

function EmployeeRejectedRoute() {
  const { user } = useContext(AppContext)
  return user?.Role == '1' ? <Navigate to='/' /> : <Outlet />
}

const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
const LoginLayout = lazy(() => import('./layouts/LoginLayout'))
const SideBarLayout = lazy(() => import('src/layouts/SideBarLayout'))
const EmployeeTable = lazy(() => import('src/pages/EmployeeTable'))
const Dashboard = lazy(() => import('src/pages/Dashboard'))
const ApproveAbsent = lazy(() => import('src/pages/ApproveAbsent/ApproveAbsent'))

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          path: path.dashboard,
          element: (
            <SideBarLayout>
              <Suspense>
                <Dashboard />
              </Suspense>
            </SideBarLayout>
          )
        },
        {
          path: path.employees,
          element: (
            <SideBarLayout>
              <Suspense>
                <EmployeeTable />
              </Suspense>
            </SideBarLayout>
          )
        },
        {
          path: path.approveAbsent,
          element: (
            <SideBarLayout>
              <Suspense>
                <ApproveAbsent />
              </Suspense>
            </SideBarLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          index: true,
          element: (
            <LoginLayout>
              <Suspense>
                <Login />
              </Suspense>
            </LoginLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
    }
  ])
  return routeElements
}
