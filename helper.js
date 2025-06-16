// hepler.js
import axios from "axios";
// https://api.webinarjam.com/webinarjam/registrants
// https://api.webinarjam.com/webinarjam/webinar




const WB_API_KEY = "9e941b07-cf6c-42c6-af10-8d832a1b7818";

const getWebinarDate = async (WEBINAR_ID) => {
  try {
    const API_URL = "https://api.webinarjam.com/webinarjam/webinar";
    const response = await axios.post(API_URL, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        api_key: WB_API_KEY,
        webinar_id: WEBINAR_ID,
      },
    });
    // console.log(response.data.webinar.schedules);
    const schedules = response.data.webinar.schedules;
    // console.log(schedules.length)
    if (schedules.length > 0) {
      // console.log(response.data);
      const schedule = schedules[0];
      // console.log(schedule);
      return schedule;
    }
  } catch (error) {
    console.log(
      `Get WebinarJam id:${WEBINAR_ID} Date error:`,
      error.response?.data.errors.message || error.message
    );
  }
};

const getRegistrants = async (WEBINAR_ID) => {
  try {
    const BASE_URL = "https://api.webinarjam.com/webinarjam/registrants";
    const DATE_RANGE = 1;
    const ATTENDED_LIVE = 1; // 0 means Registrants, 1 means Attendees

    // Fetch the first page to get pagination info
    let response = await axios.post(BASE_URL, null, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      params: {
        api_key: WB_API_KEY,
        webinar_id: WEBINAR_ID,
        attended_live: ATTENDED_LIVE,
        date_range: DATE_RANGE,
      },
    });

    let allRegistrants = [];
    const { data: firstPageData, last_page } = response.data.registrants;

    // Add registrants from the first page
    allRegistrants.push(
      ...firstPageData.map((user) => ({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
      }))
    );

    // Fetch from remaining pages if any
    for (let page = 2; page <= last_page; page++) {
      const pageResponse = await axios.post(`${BASE_URL}?page=${page}`, null, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params: {
          api_key: WB_API_KEY,
          webinar_id: WEBINAR_ID,
          attended_live: ATTENDED_LIVE,
          date_range: DATE_RANGE,
        },
      });

      const pageData = pageResponse.data.registrants.data;
      allRegistrants.push(
        ...pageData.map((user) => ({
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          email: user.email,
        }))
      );
    }
    // console.log(allRegistrants);
    return allRegistrants;
  } catch (error) {
    console.error(
      "Get Registrants WebinarJam error:",
      error.response?.data || error.message
    );
    return [];
  }
};


export { getRegistrants, getWebinarDate };
