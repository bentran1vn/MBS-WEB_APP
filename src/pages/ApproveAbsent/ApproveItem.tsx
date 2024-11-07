import { Mentor } from 'src/types/mentor.type'

interface Props {
  mentor: Mentor
  no: number
  handleApprove: (mentorId: string) => void
}
export default function ApproveItem({ mentor, no, handleApprove }: Props) {
  var date = new Date(mentor?.createdAtUtc)
  var joinDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
  return (
    <>
      <div
        key={no}
        className='p-3 mb-4 border border-slate-500 rounded-md font-normal text-md text-black grid grid-cols-12'
      >
        <div className='col-span-1 border-r-2 flex items-center'>{no}</div>
        <div className='col-span-3 border-r-2 pl-3 truncate flex items-center'>{mentor?.email}</div>
        <div className='col-span-3 border-r-2 pl-3 truncate flex items-center'>{mentor?.fullName}</div>
        <div className='col-span-2 border-r-2 pl-3 truncate flex items-center'>{joinDate}</div>
        <div className='col-span-3 pl-4 truncate grid grid-cols-4'>
          <button
            onClick={() => handleApprove(mentor.id)}
            className='col-span-2 bg-green-500 text-white p-1 mx-2 text-center rounded'
          >
            Approve
          </button>
          <button className='col-span-2 bg-red-500 text-white p-1 mx-2 text-center rounded'>Reject</button>
        </div>
      </div>
    </>
  )
}
