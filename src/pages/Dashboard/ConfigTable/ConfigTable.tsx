// import { useQuery } from '@tanstack/react-query'
// import summaryApi from 'src/apis/summary.api'
import ConfigTableItem from 'src/pages/Dashboard/ConfigTable/ConfigTableItem'

export default function ConfigTable() {
  // const { data: employeeShiftData, isLoading } = useQuery({
  //   queryKey: ['config'],
  //   queryFn: () => {
  //     return summaryApi.getSummary()
  //   },
  //   placeholderData: (prevData) => prevData,
  //   staleTime: 3 * 60 * 1000
  // })

  // const employeeShiftList = employeeShiftData?.data.data as EmployeeShiftEventList

  var isLoading = false
  return (
    <div className='h-full'>
      {!isLoading && (
        <div className='p-2 bg-white rounded-lg mt-6 shadow-md mx-auto h-full'>
          <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
            <div className='col-span-1'>No</div>
            <div className='col-span-4 '>Config Name</div>
            <div className='col-span-2 '>Value</div>
            <div className='col-span-2 '>Status</div>
            <div className='col-span-2 '>Action</div>
          </div>
          {true && (
            <div className='min-h-[310px] h-[310px]'>
              {/* {employeeShiftData?.data.data.data.map((item, index) => (
                
              ))} */}
              <ConfigTableItem configNo='1' configName='Booking Point' configValue='20' configStatus='Done' />
              <ConfigTableItem configNo='2' configName='Point Per Student' configValue='20' configStatus='Done' />
              <ConfigTableItem
                configNo='3'
                configName='Able To Create Group'
                configValue='True'
                configStatus='Un Done'
              />
              <ConfigTableItem
                configNo='4'
                configName='Able To Generate Slot'
                configValue='True'
                configStatus='Un Done'
              />
              <ConfigTableItem
                configNo='5'
                configName='Anonymous Feedback'
                configValue='False'
                configStatus='Un Done'
              />
            </div>
          )}
          {false && (
            <div className='flex flex-col justify-center items-center h-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
                />
              </svg>
              <p className='mt-1'>Empty</p>
            </div>
          )}
        </div>
      )}
      {isLoading && (
        <div className='p-4 h-full'>
          <div className='text-lg font-normal leading-none  text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200  h-full text-center flex justify-center items-center'>
            loading...
          </div>
        </div>
      )}
    </div>
  )
}
