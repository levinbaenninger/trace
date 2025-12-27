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
import type * as tasks__lib_constants from "../tasks/_lib/constants.js";
import type * as tasks__lib_errors from "../tasks/_lib/errors.js";
import type * as tasks_create from "../tasks/create.js";
import type * as tasks_list from "../tasks/list.js";
import type * as tasks_remove from "../tasks/remove.js";
import type * as tasks_toggle from "../tasks/toggle.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "_types/errors/auth": typeof _types_errors_auth;
  "_types/errors/utils": typeof _types_errors_utils;
  "_utils/auth": typeof _utils_auth;
  "tasks/_lib/constants": typeof tasks__lib_constants;
  "tasks/_lib/errors": typeof tasks__lib_errors;
  "tasks/create": typeof tasks_create;
  "tasks/list": typeof tasks_list;
  "tasks/remove": typeof tasks_remove;
  "tasks/toggle": typeof tasks_toggle;
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
