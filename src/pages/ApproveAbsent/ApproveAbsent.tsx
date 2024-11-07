import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ApproveItem from 'src/pages/ApproveAbsent/ApproveItem'
import mentorApi from 'src/apis/mentor.api'
import { toast } from 'react-toastify'

export default function ApproveAbsent() {
  const queryClient = useQueryClient()
  const { data: MentorApproveData, refetch } = useQuery({
    queryKey: ['MentorApprove'],
    queryFn: () => {
      return mentorApi.getMentorApprove()
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const approveMentorMutation = useMutation({
    mutationFn: mentorApi.approveMentor,
    onSuccess: () => {
      refetch()
      toast('Approve Successfully !', { autoClose: 5000 })
    },
    onError: (error) => {
      console.log(error)
      toast('Something Wrong !', { autoClose: 5000 })
    }
  })

  const handleApprove = (mentorId: string) => {
    approveMentorMutation.mutate({ mentorId: mentorId })
    queryClient.invalidateQueries({ queryKey: ['dashboard'] })
  }

  const ApproveList = MentorApproveData?.data.value

  return (
    <div className='grid grid-cols-12 gap-4 h-full'>
      <div className='col-span-12 border border-slate-300 rounded-md p-3 bg-white'>
        {/* Header */}
        <div className='p-3 mb-4 border border-slate-300 shadow-lg rounded-md font-medium text-md text-gray-500 grid grid-cols-12'>
          <div className='col-span-1 border-r-2'>No</div>
          <div className='col-span-3 border-r-2 pl-3 truncate'>Mentor Email</div>
          <div className='col-span-3 border-r-2 pl-3 truncate'>Mentor Name</div>
          <div className='col-span-2 border-r-2 pl-3 truncate'>Created At</div>
          <div className='col-span-3 pl-4 truncate text-center'>Action</div>
        </div>
        <div className='h-[85%] min-h-[85%]'>
          {ApproveList &&
            ApproveList.map((data, index) => {
              return <ApproveItem key={index} mentor={data} no={index} handleApprove={handleApprove} />
            })}
        </div>
      </div>
    </div>
  )
}
