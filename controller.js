import axios from "axios";

// ❌ START Tags
const createTag = async (req, res) => {
  try {
    const AC_API_KEY =
      "d0fcf31b4bc0f1c0f52f1cbf188487a1565dbb1781c9cdaf70e66adeb875a74ad4ab8ae8";
    const TagsURL = "https://oebic1747111734.api-us1.com/api/3/tags";
    const tag = {
      tag: {
        tag: "Webinar-Attenedee",
        tagType: "contact",
        description: "Webinar-Attenedee Description",
      },
    };
    const resp = await axios.post(TagsURL, tag, {
      headers: {
        "Api-Token": AC_API_KEY,
        "Content-Type": "application/json",
      },
    });
    res.json(resp.data);
  } catch (error) {
    res.json(error.message);
  }
};

const getTags1 = async (req, res) => {
  try {
    const AC_API_KEY =
      "d0fcf31b4bc0f1c0f52f1cbf188487a1565dbb1781c9cdaf70e66adeb875a74ad4ab8ae8";
    const TagsURL = "https://oebic1747111734.api-us1.com/api/3/tags";
    const resp = await axios.get(TagsURL, {
      headers: {
        "Api-Token": AC_API_KEY,
        "Content-Type": "application/json",
      },
    });
    res.json(resp.data);
  } catch (error) {
    res.json(error.message);
  }
};

const getTags2 = async (req, res) => {
  try {
    const AC_API_KEY =
      "171d70d05989fc79027078314c10042ccc78eebc28d533b1d26abeb46e4f58f07ff61878";
    const TagsURL = "https://raddsoft1748269930.api-us1.com/api/3/tags";
    const resp = await axios.get(TagsURL, {
      headers: {
        "Api-Token": AC_API_KEY,
        "Content-Type": "application/json",
      },
    });
    res.json(resp.data);
  } catch (error) {
    res.json(error.message);
  }
};

const getTags3 = async (req, res) => {
  try {
    const AC_API_KEY =
      "24365954107d07deab71b287cba7becc06d034d56cb3eb93b9cd53e6a06e982148e978fd";
    const TagsURL = "https://dugreenetdulove.activehosted.com/api/3/tags";
    const resp = await axios.get(TagsURL, {
      headers: {
        "Api-Token": AC_API_KEY,
        "Content-Type": "application/json",
      },
    });
    res.json(resp.data);
  } catch (error) {
    res.json(error.message);
  }
};

// ❌ END Tags

export {
  createTag,
  getTags2,
  getTags1,
  getTags3,
};
