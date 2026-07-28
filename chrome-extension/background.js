// Antigravity Chrome Extension - Service Worker (Manifest V3)

chrome.runtime.onInstalled.addListener(() => {
  // Create Context Menu item for instant recipe/note ingestion
  chrome.contextMenus.create({
    id: 'ingest-to-menu-lenz',
    title: 'Ingest Selection into Menu LENZ (AI Vision)',
    contexts: ['selection', 'page']
  });

  // Enable side panel on action
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(() => {});
  }
});

// Context Menu click handler
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'ingest-to-menu-lenz' && tab?.id) {
    const selectedText = info.selectionText || '';
    
    // Save selection to chrome.storage
    await chrome.storage.local.set({
      lastCapturedText: selectedText,
      lastCapturedSource: tab.url || 'Web Selection',
      capturedTimestamp: new Date().toISOString()
    });

    // Send payload to local Menu LENZ backend server if running
    try {
      await fetch('http://localhost:3001/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: `Web_Capture_${Date.now()}.txt`,
          rawText: selectedText || `Scraped from ${tab.url}`
        })
      });
    } catch (e) {
      console.log('Menu LENZ local backend offline, saved to extension storage.');
    }

    // Open side panel
    if (chrome.sidePanel?.open) {
      await chrome.sidePanel.open({ tabId: tab.id });
    }
  }
});

// Listen for popup & side panel messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'OPEN_SIDE_PANEL' && sender.tab?.windowId) {
    chrome.sidePanel.open({ windowId: sender.tab.windowId });
    sendResponse({ success: true });
  }
  return true;
});
