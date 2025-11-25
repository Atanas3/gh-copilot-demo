/**
 * validators.ts
 * Utility functions for validating album data.
 */
/**
 * Validates if a string is a valid GUID (UUID v4 or v1).
 */
/**
 * Checks if a string is a valid GUID (UUID v1-v5).
 * @param guid The string to validate.
 * @returns True if valid GUID, false otherwise.
 */
export function isValidGUID(guid: string): boolean {
  // Matches standard GUID/UUID formats (v1-v5)
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return regex.test(guid);
}

/**
 * Validates if a string is a valid IPv6 address.
 */
/**
 * Checks if a string is a valid IPv6 address.
 * @param ip The string to validate.
 * @returns True if valid IPv6, false otherwise.
 */
export function isValidIPv6(ip: string): boolean {
  // Matches full, compressed, and mixed IPv6 formats
  const regex = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9]))$/;
  return regex.test(ip);
}
/**
 * Validates a date string in French format (DD/MM/YYYY) and converts it to a Date object.
 * Returns the Date object if valid, otherwise returns null.
 */
/**
 * Parses a French-format date string (DD/MM/YYYY) to a Date object.
 * @param dateStr The date string.
 * @returns Date object if valid, null otherwise.
 */
export function parseFrenchDate(dateStr: string): Date | null {
  // Match DD/MM/YYYY
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/;
  const match = dateStr.match(regex);
  if (!match) return null;
  const day = parseInt(match[1] as string, 10);
  const month = parseInt(match[2] as string, 10) - 1; // JS months are 0-based
  const year = parseInt(match[3] as string, 10);
  const date = new Date(year, month, day);
  // Check for invalid dates (e.g., 31/02/2020)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}
// album-viewer/src/utils/validators.ts
// Utility functions for validating album data

/**
 * Checks if an album title is valid (non-empty, <= 100 chars).
 * @param title The album title.
 * @returns True if valid, false otherwise.
 */
export function isValidAlbumTitle(title: string): boolean {
  // Title must be a non-empty string and less than 100 characters
  return typeof title === 'string' && title.trim().length > 0 && title.length <= 100;
}

/**
 * Checks if an artist name is valid (non-empty, <= 50 chars).
 * @param artist The artist name.
 * @returns True if valid, false otherwise.
 */
export function isValidArtistName(artist: string): boolean {
  // Artist name must be a non-empty string and less than 50 characters
  return typeof artist === 'string' && artist.trim().length > 0 && artist.length <= 50;
}

/**
 * Checks if a year is a valid album release year (1900-current).
 * @param year The year.
 * @returns True if valid, false otherwise.
 */
export function isValidReleaseYear(year: number): boolean {
  // Year must be a four-digit number between 1900 and the current year
  const currentYear = new Date().getFullYear();
  return Number.isInteger(year) && year >= 1900 && year <= currentYear;
}
