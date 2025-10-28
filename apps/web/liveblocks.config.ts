// Define Liveblocks types for your application

import { LiveList, LiveObject } from "@liveblocks/client";


type Box = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

declare global {
  interface Liveblocks {
    Presence: {
      isTyping: boolean;
    };

    Storage: {
      boxes: LiveList<LiveObject<Box>>;
    };
  }
}

export { };
