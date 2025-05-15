import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(__dirname, '..', '..', '..', 'public');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/**
 * Uploads files to the local "public" folder
 * @param files Files to upload
 * @param location Subfolder inside "public" to store the files (e.g., 'uploads/')
 * @returns Array of file URLs
 */
export const uploadToLocal = async (
  // eslint-disable-next-line no-undef
  files: Express.Multer.File | Express.Multer.File[],
  location: string,
) => {
  try {
    if (!fs.existsSync(`${UPLOAD_DIR}${location}`)) {
      fs.mkdirSync(`${UPLOAD_DIR}${location}`, { recursive: true });
    }
    if (!files) {
      return [];
    }
    const filesArray = Array.isArray(files) ? files : [files];
    const uploadResults = [];
    const uploadPath = path.join(UPLOAD_DIR, location);

    // Ensure subdirectory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    for (const file of filesArray) {
      const filePath = path.join(uploadPath, file.originalname);
      fs.writeFileSync(filePath, file.buffer);
      uploadResults.push(`/${location}${file.originalname}`);
    }

    return uploadResults;
  } catch (error) {
    console.error('Error uploading to local folder:', error);
    throw error;
  }
};

/**
 * Deletes a file from the local "public" folder
 * @param key File path relative to "public" (e.g., 'uploads/file.jpg')
 * @returns Boolean indicating success
 */
export const deleteFromLocal = async (key: string): Promise<boolean> => {
  try {
    const filePath = path.join(UPLOAD_DIR, key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File deleted: ${key}`);
      return true;
    }
    console.warn(`File not found: ${key}`);
    return false;
  } catch (error) {
    console.error('Error deleting from local folder:', error);
    return false;
  }
};
