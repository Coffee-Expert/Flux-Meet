import { createClient } from "agora-rtm-react";

const appId = "8deebd482dad47acbfb9906c1258c672";
const token = null;
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useRTMClient = createClient(appId);
