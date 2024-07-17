chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("blockedWebsites", (data) => {
    const blockedWebsites = data.blockedWebsites || [];
    updateRules(blockedWebsites);
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.blockedWebsites) {
    const blockedWebsites = changes.blockedWebsites.newValue;
    updateRules(blockedWebsites);
  }
});

function updateRules(blockedWebsites) {
  const rules = blockedWebsites.map((url, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" },
    condition: { urlFilter: `*${url}*` },
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: rules,
    removeRuleIds: rules.map((rule) => rule.id),
  });
}
