import {
  createClient,
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
} from "agora-rtc-react";

import AgoraRTM from "agora-rtm-sdk";

const appId = "8deebd482dad47acbfb9906c1258c672";
const token = null;
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const useScreenVideoTrack = createScreenVideoTrack();

export const rtmClient = AgoraRTM.createInstance(appId);
