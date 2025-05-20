import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import config from 'config';

const s3 = new S3Client({
  region: config.get<string>('awsRegion'),
  credentials: {
    accessKeyId: config.get<string>('awsAccessKeyID'),
    secretAccessKey: config.get<string>('awsSecretAccessKey'),
  },
});

/**
 *
 * @param files files to upload
 * @param location location to upload the files to format: 'folder/'
 * @returns
 */

export const uploadToS3 = async (
  // eslint-disable-next-line no-undef
  files: Express.Multer.File | Express.Multer.File[],
  location: string,
) => {
  try {
    if (!files) {
      return [];
    }
    const filesArray = Array.isArray(files) ? files : [files];
    const uploadResults = [];

    for (const file of filesArray) {
      const params: PutObjectCommandInput = {
        Bucket: config.get<string>('awsBucketName'),
        Key: `${location}${file.originalname}`,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      uploadResults.push(`${config.get<string>('cloudfrontBaseUrl')}/${params.Key}`);
    }

    return uploadResults; // Return an array of uploaded file details
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

export const deleteFromS3 = async (key: string): Promise<boolean> => {
  try {
    const params: DeleteObjectCommandInput = {
      Bucket: config.get<string>('awsBucketName'),
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    console.log(`File deleted: ${key}`);
    return true;
  } catch (error) {
    console.error('Error deleting from S3:', error);
    return false;
  }
};
