import { useQuery } from '@tanstack/react-query'
import mentorApi from 'src/apis/mentor.api'
import { Mentor } from 'src/types/mentor.type'
import { handleDateNet } from 'src/utils/utils'

interface Props {
  mentor: Mentor
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function MentorPopoverInfo({ mentor, handleOpen }: Props) {
  const { data: mentorData } = useQuery({
    queryKey: ['employee', mentor.id],
    queryFn: () => {
      return mentorApi.getMentor(mentor.id)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  return (
    <div className='w-[70%] h-[95%] bg-white p-6 rounded-lg shadow-lg overflow-hidden'>
      {/* Header + Button Leave */}
      <div className='flex justify-between items-center mb-2'>
        <div className='text-3xl font-medium text-gray-700'>Mentor Information</div>
        <button onClick={handleOpen} className='rounded-md py-2 px-4 bg-gray-200 text-gray-500 hover:bg-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3' />
          </svg>
        </button>
      </div>

      {/* Main content area */}
      <div className='py-4 h-full overflow-y-auto'>
        <div className='grid grid-cols-12 gap-4'>
          {/* Mentor Info */}
          <div className='col-span-8 space-y-6'>
            {/* ID */}
            <div className='flex justify-center items-center'>
              <div className='w-1/4 text-lg text-gray-700 font-semibold'>ID</div>
              <div className='w-3/4 p-3 border border-gray-300 rounded-md'>{mentorData?.data?.value?.id}</div>
            </div>
            {/* Full Name */}
            <div className='flex justify-center items-center'>
              <div className='w-1/4 text-lg text-gray-700 font-semibold'>Name</div>
              <div className='w-3/4 p-3 border border-gray-300 rounded-md'>{mentorData?.data?.value?.fullName}</div>
            </div>
            {/* Email */}
            <div className='flex justify-center items-center'>
              <div className='w-1/4 text-lg text-gray-700 font-semibold'>Email</div>
              <div className='w-3/4 p-3 border border-gray-300 rounded-md'>{mentorData?.data?.value?.email}</div>
            </div>
            {/* Point */}
            <div className='flex justify-center items-center'>
              <div className='w-1/4 text-lg text-gray-700 font-semibold'>Point</div>
              <div className='w-3/4 p-3 border border-gray-300 rounded-md'>{mentorData?.data?.value?.point}</div>
            </div>
            {/* Joined */}
            <div className='flex justify-center items-center'>
              <div className='w-1/4 text-lg text-gray-700 font-semibold'>Joined</div>
              <div className='w-3/4 p-3 border border-gray-300 rounded-md'>
                {handleDateNet(new Date(mentorData?.data?.value?.createdOnUtc as string))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <div className='text-lg font-semibold text-gray-700 mb-2'>Certificates</div>
              <div className='overflow-y-auto max-h-[38%] space-y-4'>
                {(mentorData?.data?.value?.skills?.length as number) > 0 ? (
                  mentorData?.data.value.skills.map((item, index) => (
                    <div key={index} className='p-4 border border-gray-300 rounded-md'>
                      <div className='text-xl font-semibold text-gray-800 mb-2'>Name: {item.skillName}</div>
                      <div className='text-gray-700 mb-2'>Type: {item.skillCategoryType}</div>
                      <div className='text-gray-700 mb-2'>Images</div>
                      <div className='flex gap-2'>
                        {item.cetificates?.length > 0 ? (
                          item.cetificates.map((itemC, indexC) => (
                            <img
                              key={indexC}
                              src={itemC.cetificateImageUrl}
                              alt='Certificate'
                              className='h-40 w-40 object-cover rounded-lg'
                            />
                          ))
                        ) : (
                          <div className='text-center w-full py-4 text-gray-500'>No certificates available</div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-4 text-gray-500 border border-gray-300 rounded-md'>
                    No skills available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
