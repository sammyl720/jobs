import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from '../actions/types'

const initailState = { token: null, rejected: false }
export default (state = initailState, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload, rejected: false }
    case FACEBOOK_LOGIN_FAIL:
      return { token: null, rejected: true }
    default:
      return state
  }
}
