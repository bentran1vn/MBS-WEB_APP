import { Summary } from 'src/types/summary.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/query-api/v1/sumaries'

const summaryApi = {
  getSummary() {
    return http.get<SuccessResponse<Summary>>(URL)
  }
}

export default summaryApi
