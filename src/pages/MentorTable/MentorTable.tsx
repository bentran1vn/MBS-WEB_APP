import { useQuery } from '@tanstack/react-query'
import Popover from 'src/components/Popover'
import { useState } from 'react'
import { handleRenderNo } from 'src/utils/utils'
import { Button } from '@nextui-org/react'
import Pagination from 'src/components/Pagination'
import path from 'src/constant/path'
import { useQueryConfig } from 'src/hooks/useQueryConfig'
import { Mentor, MentorConfig } from 'src/types/mentor.type'
import mentorApi from 'src/apis/mentor.api'
import MentorPopoverInfo from 'src/pages/MentorTable/MentorPopoverInfo'

export type QueryConfig = {
  [key in keyof MentorConfig]: string
}

export default function MentorTable() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<Mentor>()
  const queryConfig = useQueryConfig()

  const { data: mentorsData } = useQuery({
    queryKey: ['employee', queryConfig],
    queryFn: () => {
      return mentorApi.getMentors(queryConfig as MentorConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const mentorList = mentorsData?.data?.value?.items as Mentor[]

  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (mentor: Mentor) => {
    setIsOpen(!isOpen)
    setIsEdit(mentor)
  }

  return (
    <div className='bg-white h-full border border-gray-300 rounded-md'>
      <div className='pt-7 px-4 flex justify-between items-center'>
        <form className='flex ml-5'>
          <div className='border border-gray-300 py-2 px-4 rounded-lg flex'>
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
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
            <input className='outline-none px-3' type='text' placeholder='Search by name...' />
          </div>
          <button
            aria-label='search_bar'
            className='text-gray-500 bg-gray-200 hover:bg-gray-300 ml-4 px-10 py-3 text-md font-medium rounded-lg'
          >
            Search
          </button>
        </form>
      </div>
      <div className='min-h-[700px]'>
        {mentorList && (
          <div className='p-4 pb-0 min-h-[625px]'>
            <div className='grid grid-cols-12 bg-gray-400/80 text-white my-3 text-lg font-medium p-4 py-2 rounded-xl text-center items-center'>
              <div className='col-span-2 text-left pl-4'>No</div>
              <div className='col-span-3'>Full Name</div>
              <div className='col-span-3'>Email</div>
              <div className='col-span-2'>Point</div>
              <div className='col-span-2'>Action</div>
            </div>
            {mentorList.map((item, index) => (
              <div
                className='bg-gray-100/80 h-[46px] mb-4 px-4 grid grid-cols-12 text-center rounded-xl items-center'
                key={item.id}
              >
                <div className='col-span-2 text-left pl-4'>
                  {handleRenderNo(
                    mentorsData?.data.value.pageIndex as number,
                    mentorsData?.data.value.pageSize as number,
                    index
                  )}
                </div>
                <div className='col-span-3'>{item.fullName}</div>
                <div className='col-span-3'>{item.email}</div>
                <div className='col-span-2 flex items-center justify-center'>{item.point}</div>
                <div className='col-span-2 flex justify-center'>
                  <Popover
                    key={item.id}
                    initialOpen={isOpen}
                    renderPopover={isEdit && <MentorPopoverInfo mentor={isEdit} handleOpen={handleClose} />}
                  >
                    <Button className='bg-transparent' onClick={() => handleSelect(item)}>
                      <div className='flex justify-center items-center'>
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
                            d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
                          />
                        </svg>
                        <div className='text-medium ml-2'>Details</div>
                      </div>
                    </Button>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        )}
        {!mentorList && (
          <div className='p-4 pb-0! min-h-[625px]'>
            <div className='text-lg font-normal leading-none  text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 min-h-[600px] text-center flex justify-center items-center'>
              loading...
            </div>
          </div>
        )}
        {mentorList && (
          <div className='flex justify-center'>
            <Pagination
              queryConfig={queryConfig}
              pageSize={mentorsData?.data?.value?.totalCount as number}
              pathName={path.employees}
            />
          </div>
        )}
      </div>
    </div>
  )
}
