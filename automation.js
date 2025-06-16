// automation.js
import { DateTime } from "luxon";
import { schedule } from "node-cron";
import { getWebinarDate } from "./helper.js";
import { addToActiveCampaignCron } from "./controller.act.js";

console.log("🚀 Cron job scheduled for every minute");

// const webinarDate = { comment: "Wednesday, 4 Jun 2025, 8:05 PM", schedule: 13 };

async function createWebinarScheduler(
  AC_API_KEY,
  SYNC_API_URL,
  TAG_API_URL,
  tagId,
  webinarId
) {
  try {
    const webinarDate = await getWebinarDate(webinarId);
    // console.log(webinarDate);
    if (!webinarDate || webinarDate.length === 0) {
      console.warn(`⚠️ No datetime found for webinar ID: ${webinarId}`);
      return;
    }
    const comment = webinarDate.comment;
    const webinarDateTime = DateTime.fromFormat(
      comment,
      "cccc, d LLL yyyy, h:mm a"
    );
    // console.log(webinarDateTime);
    if (!webinarDateTime.isValid) {
      console.error(`❌ Invalid datetime format for webinar ID: ${webinarId}`);
      return;
    }

    const now = DateTime.local();

    const currentFormatted = now.toFormat("yyyy-MM-dd HH:mm");
    const webinarFormatted = webinarDateTime.toFormat("yyyy-MM-dd HH:mm");

    console.log(
      `[${now.toFormat("HH:mm")}] Checking webinar ID ${webinarId}...`
    );

    if (currentFormatted === webinarFormatted) {
      console.log(`✅ It's time for webinar ID ${webinarId}!`);

      const delay15m = 15 * 60 * 1000;
      const delay2h = 2 * 60 * 60 * 1000;

      // Task after 15 minutes
      setTimeout(async () => {
        try {
          console.log(`🚀 [Webinar ${webinarId}] Task after 15 minutes`);
          await addToActiveCampaignCron(
            AC_API_KEY,
            SYNC_API_URL,
            TAG_API_URL,
            tagId,
            webinarId
          );
          console.log(`✅ [Webinar ${webinarId}] Campaign completed`);
        } catch (error) {
          console.error(
            `❌ [Webinar ${webinarId}] Error in 15-min task:`,
            error
          );
        }
      }, delay15m);

      // Task after 2 hours
      setTimeout(async () => {
        try {
          console.log(`🕑 [Webinar ${webinarId}] Task after 2 hours`);
          await addToActiveCampaignCron(
            AC_API_KEY,
            SYNC_API_URL,
            TAG_API_URL,
            tagId,
            webinarId
          );
          console.log(`✅ [Webinar ${webinarId}] Campaign completed`);
        } catch (error) {
          console.error(
            `❌ [Webinar ${webinarId}] Error in 2-hour task:`,
            error
          );
        }
      }, delay2h);

      // Task after 3 hours
      setTimeout(async () => {
        try {
          console.log(`🕑 [Webinar ${webinarId}] Task after 3 hours`);
          await addToActiveCampaignCron(
            AC_API_KEY,
            SYNC_API_URL,
            TAG_API_URL,
            webinarId
          );
          console.log(`✅ [Webinar ${webinarId}] Campaign completed`);
        } catch (error) {
          console.error(
            `❌ [Webinar ${webinarId}] Error in 3-hour task:`,
            error
          );
        }
      }, delay2h);
    } else {
      console.log(`⏳ [Webinar ${webinarId}] Not time yet.`);
    }
  } catch (error) {
    console.error(`❌ Unexpected error for webinar ID ${webinarId}:`, error);
  }
}

schedule("*/1 * * * *", async () => {
  const now = DateTime.local();
  // Define today's time boundaries
  const noon = DateTime.fromFormat("12:00PM", "hh:mma").set({
    year: now.year,
    month: now.month,
    day: now.day,
  });

  const eightPM = DateTime.fromFormat("8:00PM", "h:mma").set({
    year: now.year,
    month: now.month,
    day: now.day,
  });

  // Handle both time ranges
  if (now >= noon && now < eightPM) {
    console.log("🕑 It's between 12:00 PM and 8:00 PM");
        // ✅ Replace with your actual AC_API_KEY,SYNC_API_URL,TAG_API_URL,TAG_ID,webinarId
    await createWebinarScheduler(
      "d0fcf31b4bc0f1c0f52f1cbf188487a1565dbb1781c9cdaf70e66adeb875a74ad4ab8ae8",
      "https://oebic1747111734.api-us1.com/api/3/contact/sync",
      "https://oebic1747111734.api-us1.com/api/3/contactTags",
      "1",
      "11"
    );

  } else {
    // For 8:00 PM to 11:59 PM or 12:00 AM to before 12:00 PM
    const isAfter8PM = now >= eightPM;
    const isBeforeNoon = now < noon;

    if (isAfter8PM || isBeforeNoon) {
      console.log("🌙 It's between 8:00 PM and 12:00 PM (next day)");
          // ✅ Replace with your actual AC_API_KEY,SYNC_API_URL,TAG_API_URL,TAG_ID,webinarId
    await createWebinarScheduler(
      "d0fcf31b4bc0f1c0f52f1cbf188487a1565dbb1781c9cdaf70e66adeb875a74ad4ab8ae8",
      "https://oebic1747111734.api-us1.com/api/3/contact/sync",
      "https://oebic1747111734.api-us1.com/api/3/contactTags",
      "1",
      "11"
    );
    } else {
      console.log("⚠️ Time doesn't match any range (shouldn't happen)");
    }
  }
 

  
});
