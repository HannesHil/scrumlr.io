import Cookies from "js-cookie";

const showLegalDocuments = Cookies.get("scrumlr__show-legal-documents");
const serverURL = Cookies.get("scrumlr__server-url");
const websocketURL = Cookies.get("scrumlr__websocket-url");

let httpProtocol = "https:";
let websocketProtocol = "wss:";

if (window.location.protocol === "http:") {
  httpProtocol = "http:";
  websocketProtocol = "ws:";
}

export const SHOW_LEGAL_DOCUMENTS = showLegalDocuments !== undefined ? showLegalDocuments.toLowerCase() === "true" : true;
export const SERVER_HTTP_URL = serverURL || import.meta.env.VITE_SERVER_HTTP_URL || `${window.location.origin.replace(window.location.protocol, httpProtocol)}/api`;
export const SERVER_WEBSOCKET_URL =
  websocketURL || import.meta.env.VITE_SERVER_WEBSOCKET_URL || `${window.location.origin.replace(window.location.protocol, websocketProtocol)}/api`;
export const SERVER_WEBSOCKET_PROTOCOL = websocketProtocol;
