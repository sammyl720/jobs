import axios from 'axios'
import reverseGeocode from 'latlng-to-zip'
import qs from 'qs'
import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types'

const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
}

const JOBS_ROOT_URL = 'http://api.indeed.com/ads/apisearch?'
import { googleMapsApiKey } from '../../keys'
import JOB_DATA from './indeedJobData.json'
const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip })
  return `${JOBS_ROOT_URL}${query}`
}
export const fetchJobs = (region, cb) => async (dispatch) => {
  try {
    const zipcode = await reverseGeocode(region, googleMapsApiKey)
    const url = buildJobsUrl(zipcode)
    // const { data } = await axios.get(url)
    // console.log(data)
    dispatch({ type: FETCH_JOBS, payload: JOB_DATA })
    cb()
  } catch (err) {
    console.log(err)
  }
}

export const likeJob = (job) => {
  return {
    type: LIKE_JOB,
    payload: job
  }
}

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS
  }
}
