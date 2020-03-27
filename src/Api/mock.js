function getPackages() {
  return {
    "0": { id: 0, name: "Custom" },
    "1": { id: 1, name: "Silver" },
    "2": { id: 2, name: "Gold" },
    "3": { id: 3, name: "Diamond" }
  };
}

// hardcoded for demo
function getPackageFeatures() {
  return {
    "0": [],
    "1": {
      ad_slates: {
        id: "ad_slates",
        status: 2
      }
    },
    "2": [],
    "3": []
  };
}

export default {
  getPackages,
  getPackageFeatures
};
