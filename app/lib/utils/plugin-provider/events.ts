export const PLUGIN_SDK_NAMESPACE_BASE_TOKEN = "bridged";
export const PLUGIN_SDK_NS_RESPONSE_ALL = "bridged/response/*";
export const PLUGIN_SDK_NS_APP_REQUEST_CUSTOM_ALL = "bridged/app/request/*";
export const PLC_REMOTE_API_REQ = "pugin-consumer/remote-api/request";
export const PLC_REMOTE_API_RES = "pugin-consumer/remote-api/response";
export const PLUGIN_SDK_NS_REMOTE_API = `${PLUGIN_SDK_NAMESPACE_BASE_TOKEN}/remote-api`;
export const PLUGIN_SDK_NS_GENERAL_STATE_DATA = `${PLUGIN_SDK_NAMESPACE_BASE_TOKEN}/general-state-data`;

// region sync
export const PLUGIN_SDK_NS_SYNC = `${PLUGIN_SDK_NAMESPACE_BASE_TOKEN}/sync`;
// endregion sync

// region meta
export const PLUGIN_SDK_NS_META_API = `${PLUGIN_SDK_NAMESPACE_BASE_TOKEN}/meta`;
export const PLUGIN_SDK_EK_BATCH_META_UPDATE =
  "assistant/tools/batch-meta-editor/update";
export const PLUGIN_SDK_EK_REQUEST_FETCH_ROOT_META =
  "assistant/tools/batch-meta-editor/fetch";
export const PLUGIN_SDK_EK_REQUEST_FETCH_NODE_META =
  "assistant/tools/node-meta-editor/fetch";
export const PLUGIN_SDK_EK_REQUEST_FETCH_NODE_MAIN_COMPONENT_META =
  "assistant/tools/node-meta-editor/fetch/main-component";
export const PLUGIN_SDK_EK_REQUEST_FETCH_NODE_MAIN_COMPONENT_LAYER_META =
  "assistant/tools/node-meta-editor/fetch/main-component/layer";
export const PUGIN_SDK_EK_REQUEST_UPDATE_NODE_META =
  "assistant/tools/node-meta-editor/update";
export const PUGIN_SDK_EK_REQUEST_UPDATE_MAIN_COMPONENT_META =
  "assistant/tools/node-meta-editor/update/main-component";
// endregion meta

// region notify
export const PLUGIN_SDK_NS_NOTIFY_API = `${PLUGIN_SDK_NAMESPACE_BASE_TOKEN}/notify`;
export const PLUGIN_SDK_EK_SIMPLE_NOTIFY = "notify";
export const PLUGIN_SDK_EK_NOTIFY_COPIED = "notify-copied";

// endregion notify

// region canvas
export const PLUGIN_SDK_NS_DRAG_AND_DROP = `${PLUGIN_SDK_NAMESPACE_BASE_TOKEN}/drag-and-drop`;
export const PLUGIN_SDK_EK_DRAG_AND_DROPPED = `dropped on canvas`;
// endregion canvas

export interface BasePluginEvent<T = any> {
  /**
   * app stands for ui.ts
   * server stands for code.ts
   */
  namespace: string;
  key: string;
  data: T;
}

/**
 * An Event object interface to pass Plugin events from / to PluginService and PluginApp
 */
export interface TransportPluginEvent extends BasePluginEvent {
  origin: "app" | "server";
  type: "response" | "request";
  error?: Error;
  id: string;
}
