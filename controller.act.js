// controller.act.js
import axios from 'axios';
import { getRegistrants } from './helper.js';

// ✅ FIXED: Separate function for cron jobs (no req/res)
const addToActiveCampaignCron = async (AC_API_KEY,SYNC_API_URL,TAG_API_URL,tagId,WebinarId) => {
  try {
    const contacts = await getRegistrants(WebinarId);
    if (!contacts || !Array.isArray(contacts)) {
      throw new Error("Invalid registrant data");
    }

    console.log(`🚀 Processing ${contacts.length} contacts for tag ID ${tagId}`);

    for (const contact of contacts) {
      const { first_name, last_name, phone, email } = contact;
      
      if (!email) {
        console.log(`⚠️ Skipping contact with no email`);
        continue;
      }

      const contactPayload = {
        contact: {
          email,
          firstName: first_name || "",
          lastName: last_name || "",
          phone: phone || "",
        },
      };

      try {
        // Step 1: Sync contact
        const syncRes = await axios.post(SYNC_API_URL, contactPayload, {
          headers: {
            "Api-Token": AC_API_KEY,
            "Content-Type": "application/json",
          },
        });

        const contactId = syncRes.data?.contact?.id;
        
        if (!contactId) {
          console.error(`⚠️ No contact ID returned for ${email}`);
          continue;
        }

        // Step 2: Assign tag to contact
        const tagPayload = {
          contactTag: {
            contact: contactId,
            tag: tagId,
          },
        };

        const tagRes = await axios.post(TAG_API_URL, tagPayload, {
          headers: {
            "Api-Token": AC_API_KEY,
            "Content-Type": "application/json",
          },
        });

        console.log(`✅ Tagged ${email} with tag ID ${tagId}`);

      } catch (err) {
        console.error(`❌ Failed for ${email}:`, err.response?.data || err.message);
      }
    }

    console.log(`✅ Completed processing for tag ID ${tagId}`);
    return { success: true, message: `All contacts processed for tag ${tagId}` };

  } catch (error) {
    console.error("ActiveCampaign integration error:", error.message);
    throw error; // Re-throw for cron job error handling
  }
};


export{
    addToActiveCampaignCron,
}