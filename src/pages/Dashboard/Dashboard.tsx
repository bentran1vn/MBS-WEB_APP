import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import configApi from 'src/apis/config.api'
import summaryApi from 'src/apis/summary.api'
import ConfigTable from 'src/pages/Dashboard/ConfigTable'

import { Summary } from 'src/types/summary.type'

export default function Dashboard() {
  const { data: summaryData } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => {
      return summaryApi.getSummary()
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const generatePointMutation = useMutation({
    mutationFn: configApi.generatePoint,
    onSuccess: () => {
      toast('Approve Successfully !', { autoClose: 1000 })
    },
    onError: (error) => {
      console.log(error)
      toast('Something Wrong !', { autoClose: 1000 })
    }
  })

  const generatePointGroupMutation = useMutation({
    mutationFn: configApi.generatePointGroup,
    onSuccess: () => {
      toast('Approve Successfully !', { autoClose: 1000 })
    },
    onError: (error) => {
      console.log(error)
      toast('Something Wrong !', { autoClose: 1000 })
    }
  })

  const generateSlotMutation = useMutation({
    mutationFn: configApi.generateSlot,
    onSuccess: () => {
      toast('Approve Successfully !', { autoClose: 1000 })
    },
    onError: (error) => {
      console.log(error)
      toast('Something Wrong !', { autoClose: 1000 })
    }
  })

  const dashboardData = summaryData?.data?.value as Summary

  return (
    <>
      <div className='grid grid-cols-12 grid-rows-6 h-full'>
        <div className='col-span-12 row-span-1 grid grid-cols-12 gap-4'>
          <div className='col-span-3 bg-white p-6'>
            <div className='text-2xl mb-5 truncate'>Mentor Active</div>
            <div className='text-4xl font-normal'>{dashboardData?.totalMentorActive ?? 0}</div>
          </div>
          <div className='col-span-3 bg-white p-6'>
            <div className='text-2xl mb-5 truncate'>Student Active</div>
            <div className='text-4xl font-normal'>{dashboardData?.totalStudentActive ?? 0}</div>
          </div>
          <div className='col-span-2 bg-white p-6'>
            <div className='text-2xl mb-5 truncate'>Group Active</div>
            <div className='text-4xl font-normal'>{dashboardData?.totalGroupActive ?? 0}</div>
          </div>
          <div className='col-span-4 bg-white p-6'>
            <div className='grid grid-cols-4 mb-2 gap-2'>
              <button
                onClick={() => {
                  generatePointMutation.mutate()
                }}
                className={classNames('col-span-2 p-3 bg-blue-500 text-white text-md w-full truncate', {
                  'opacity-50 cursor-not-allowed': generatePointMutation.isPending // Add styles for disabled state
                })}
                disabled={generatePointMutation.isPending}
              >
                Point Generate
              </button>
              <button
                onClick={() => {
                  generatePointGroupMutation.mutate()
                }}
                className={classNames('col-span-2 p-3 bg-blue-500 text-white text-md w-full truncate', {
                  'opacity-50 cursor-not-allowed': generatePointGroupMutation.isPending // Add styles for disabled state
                })}
                disabled={generatePointGroupMutation.isPending} // Disable button while mutation is loading
              >
                Group Point Generate
              </button>
            </div>
            <button
              onClick={() => {
                generateSlotMutation.mutate()
              }}
              className={classNames('col-span-2 p-3 bg-blue-500 text-white text-md w-full truncate', {
                'opacity-50 cursor-not-allowed': generateSlotMutation.isPending // Add styles for disabled state
              })}
              disabled={generateSlotMutation.isPending}
            >
              Schedule Generate
            </button>
          </div>
        </div>
        <div className='col-span-12 row-span-5'>
          <ConfigTable />
        </div>
      </div>
    </>
  )
}
