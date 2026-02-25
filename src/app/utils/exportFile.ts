/**
 * Generic function to handle file exports/downloads
 * @param blob - The blob data from the API response
 * @param fileName - The name of the file to be downloaded
 */
export const downloadFile = (blob: Blob, fileName: string): void => {
  try {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw new Error("Failed to download file");
  }
};

/**
 * Generate a timestamped file name
 * @param baseFileName - The base file name without timestamp
 * @param extension - File extension (e.g., 'xlsx', 'csv', 'pdf')
 * @returns Complete file name with timestamp
 */
export const generateFileName = (
  baseFileName: string,
  extension: string = "csv",
): string => {
  const timestamp = new Date().getTime();
  return `${baseFileName}-${timestamp}.${extension}`;
};
