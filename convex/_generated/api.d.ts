/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as _types_errors_auth from "../_types/errors/auth.js";
import type * as _types_errors_utils from "../_types/errors/utils.js";
import type * as _utils_auth from "../_utils/auth.js";
import type * as commits_list from "../commits/list.js";
import type * as issues__lib_constants from "../issues/_lib/constants.js";
import type * as issues__lib_errors from "../issues/_lib/errors.js";
import type * as issues_create from "../issues/create.js";
import type * as issues_get from "../issues/get.js";
import type * as issues_list from "../issues/list.js";
import type * as issues_remove from "../issues/remove.js";
import type * as issues_update from "../issues/update.js";
import type * as pullRequests__lib_errors from "../pullRequests/_lib/errors.js";
import type * as pullRequests_create from "../pullRequests/create.js";
import type * as pullRequests_get from "../pullRequests/get.js";
import type * as pullRequests_list from "../pullRequests/list.js";
import type * as pullRequests_merge from "../pullRequests/merge.js";
import type * as pullRequests_remove from "../pullRequests/remove.js";
import type * as pullRequests_update from "../pullRequests/update.js";
import type * as stats_get from "../stats/get.js";
import type * as users_list from "../users/list.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "_types/errors/auth": typeof _types_errors_auth;
  "_types/errors/utils": typeof _types_errors_utils;
  "_utils/auth": typeof _utils_auth;
  "commits/list": typeof commits_list;
  "issues/_lib/constants": typeof issues__lib_constants;
  "issues/_lib/errors": typeof issues__lib_errors;
  "issues/create": typeof issues_create;
  "issues/get": typeof issues_get;
  "issues/list": typeof issues_list;
  "issues/remove": typeof issues_remove;
  "issues/update": typeof issues_update;
  "pullRequests/_lib/errors": typeof pullRequests__lib_errors;
  "pullRequests/create": typeof pullRequests_create;
  "pullRequests/get": typeof pullRequests_get;
  "pullRequests/list": typeof pullRequests_list;
  "pullRequests/merge": typeof pullRequests_merge;
  "pullRequests/remove": typeof pullRequests_remove;
  "pullRequests/update": typeof pullRequests_update;
  "stats/get": typeof stats_get;
  "users/list": typeof users_list;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
