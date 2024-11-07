import { Mentor } from 'src/types/mentor.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const QUERY_URL = '/query-api/v1/mentors'
const COMMAND_URL = '/command-api/v1/user'

const mentorApi = {
  getMentorApprove() {
    return http.get<SuccessResponse<Mentor[]>>(`${QUERY_URL}/approve`)
  },
  approveMentor: (body: { mentorId: string }) => http.post<any>(`${COMMAND_URL}/create-mentor`, body)
}

export default mentorApi
