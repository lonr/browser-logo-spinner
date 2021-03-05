export function getBrowserName(): String {
  const ua = navigator.userAgent;
  switch (true) {
    case /\bFirefox\b|\bFxiOS\b/.test(ua):
      return "Firefox";
    case /\bOPR\b/.test(ua):
      return "Opera";
    case /\bEdg\b/.test(ua):
      return "Edge";
    case /\bWindows Phone\b|\bSamsungBrowser\b|\bUCBrowser\b/.test(ua):
      return "Other";
    case /\bChrome\b|\bCriOS\b|\bHeadlessChrome\b/.test(ua):
      return "Chrome";
    case /\bSafari\b/.test(ua):
      return "Safari";
    default:
      return "Other";
  }
}

export const defaultStyle =
  "<style>:host { display: inline-block; } svg { width: 100%; vertical-align: bottom; }</style>";
