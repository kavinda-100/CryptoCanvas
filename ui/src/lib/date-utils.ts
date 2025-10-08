/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Formats a timestamp (in seconds or BigInt) to a human-readable date string
 * @param timestamp - Unix timestamp in seconds (number or BigInt)
 * @param options - Intl.DateTimeFormat options for customizing the output
 * @returns Formatted date string
 */
export function formatListedDate(
  timestamp: number | bigint,
  options?: Intl.DateTimeFormatOptions,
): string {
  // Convert BigInt to number if needed
  const timestampNumber =
    typeof timestamp === "bigint" ? Number(timestamp) : timestamp;

  // Create date object (multiply by 1000 to convert from seconds to milliseconds)
  const date = new Date(timestampNumber * 1000);

  // Default options for a clean, readable format
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  };

  return date.toLocaleDateString("en-US", defaultOptions);
}

/**
 * Formats a timestamp to show relative time (e.g., "2 days ago", "3 hours ago")
 * @param timestamp - Unix timestamp in seconds (number or BigInt)
 * @returns Relative time string
 */
export function formatRelativeTime(timestamp: number | bigint): string {
  const timestampNumber =
    typeof timestamp === "bigint" ? Number(timestamp) : timestamp;
  const date = new Date(timestampNumber * 1000);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
}

/**
 * Formats a timestamp to show both absolute and relative time
 * @param timestamp - Unix timestamp in seconds (number or BigInt)
 * @returns Object with both formatted and relative time
 */
export function formatDateWithRelative(timestamp: number | bigint) {
  return {
    formatted: formatListedDate(timestamp),
    relative: formatRelativeTime(timestamp),
  };
}
