import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types'
import { REHYDRATE } from 'redux-persist/lib/constants'
import _ from 'lodash'

export default (state = [], action) => {
  switch (action.type) {
    case LIKE_JOB:
      return _.uniqBy([action.payload, ...state], 'jobkey')
    case REHYDRATE:
      return action.payload?.likedJobs || []
    case CLEAR_LIKED_JOBS:
      return []
    default:
      return state
  }
}
