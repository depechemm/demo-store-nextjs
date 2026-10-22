import { eventWithTime } from "@rrweb/types";
//#region src/config/VizoraConfig.d.ts
interface VizoraPrivacyConfig {
  includeQueryString?: boolean;
  includeHash?: boolean;
}
interface VizoraReplayConfig {
  enabled?: boolean;
  endpoint?: string;
  flushInterval?: number;
  maxEventsPerChunk?: number;
  maxBufferSize?: number;
}
interface VizoraConfig {
  projectKey: string;
  endpoint?: string;
  sessionTimeout?: number;
  batchSize?: number;
  flushInterval?: number;
  maxBufferSize?: number;
  privacy?: VizoraPrivacyConfig;
  replay?: VizoraReplayConfig;
  onError?: (error: unknown) => void;
}
//#endregion
//#region src/events/EventType.d.ts
declare const EventType: {
  readonly PAGE_VIEW: "page_view";
  readonly CLICK: "click";
  readonly SCROLL: "scroll";
  readonly MOUSEMOVE: "mousemove";
  readonly RESIZE: "resize";
  readonly NAVIGATION: "navigation";
  readonly CUSTOM: "custom";
};
type EventType = (typeof EventType)[keyof typeof EventType];
//#endregion
//#region src/events/VizoraEvent.d.ts
interface VizoraEvent {
  eventId: string;
  pageId: string;
  type: EventType;
  occurredAt: string;
  sequence: number;
  url: string;
  viewport: {
    width: number;
    height: number;
  };
  payload: Record<string, unknown>;
}
//#endregion
//#region src/batch/EventBatch.d.ts
interface EventBatch {
  projectKey: string;
  sessionId: string;
  sentAt: string;
  events: VizoraEvent[];
}
//#endregion
//#region src/transport/Transport.d.ts
interface TransportSendOptions {
  keepalive?: boolean;
}
interface Transport {
  send(batch: EventBatch, options?: TransportSendOptions): Promise<void>;
}
//#endregion
//#region src/Vizora.d.ts
export declare class Vizora {
  private readonly projectKey;
  private readonly flushInterval;
  private flushTimer;
  private sessionTransitionPromise;
  private readonly onError;
  private readonly sessionManager;
  private readonly pageManager;
  private readonly sequenceManager;
  private readonly urlPrivacyFilter;
  private readonly eventFactory;
  private readonly eventPipeline;
  private readonly collectors;
  private readonly replayManager;
  private readonly replayFlushInterval;
  private replayFlushTimer;
  private started;
  private startPageViewPending;
  private readonly handlePageHide;
  constructor(config: VizoraConfig, transport?: Transport);
  start(): Promise<void>;
  flush(): Promise<void>;
  stop(): Promise<void>;
  private enqueueEvent;
  private rotateSession;
  private recordEvent;
  private recordEventAfterSessionRotation;
  private ensureSessionRotated;
  private flushIfNeeded;
  private handleNavigation;
  private flushReplay;
  private clearTimers;
  private runInBackground;
  private handleBackgroundError;
}
//#endregion
//#region src/replay/Recorder.d.ts
interface Recorder {
  start(onEvent: (event: eventWithTime) => void): void;
  takeFullSnapshot(): void;
  stop(): void;
}
//#endregion
//#region src/replay/ReplayRecorder.d.ts
export declare class ReplayRecorder implements Recorder {
  private stopRecording;
  start(onEvent: (event: eventWithTime) => void): void;
  stop(): void;
  takeFullSnapshot(): void;
}
//#endregion
//#region src/index.d.ts
export declare const VERSION = "0.1.0";
//#endregion
export type { VizoraConfig };