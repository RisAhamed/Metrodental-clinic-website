/**
 * Absolute URL of the separate Metro Dental store / patient application.
 * Configure with NEXT_PUBLIC_STORE_URL. When it is empty, store links are hidden.
 */
export const storeUrl = (process.env.NEXT_PUBLIC_STORE_URL ?? "").replace(/\/+$/, "")

export const hasStoreUrl = storeUrl.length > 0
