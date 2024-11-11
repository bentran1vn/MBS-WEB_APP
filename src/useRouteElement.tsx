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

const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
const LoginLayout = lazy(() => import('./layouts/LoginLayout'))
const SideBarLayout = lazy(() => import('src/layouts/SideBarLayout'))
const MentorTable = lazy(() => import('src/pages/MentorTable'))
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
                <MentorTable />
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
