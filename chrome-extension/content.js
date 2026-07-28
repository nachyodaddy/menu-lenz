// Antigravity Extension Content Script

// Listen for extraction requests from Popup / Side Panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'EXTRACT_PAGE_RECIPE') {
    const pageTitle = document.title || 'Untitled Page';
    const mainText = document.body ? document.body.innerText.slice(0, 3000) : '';
    
    sendResponse({
      title: pageTitle,
      url: window.location.href,
      text: mainText
    });
  }
  return true;
});
