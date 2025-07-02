"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromS3 = exports.uploadToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("config"));
const s3 = new client_s3_1.S3Client({
    region: config_1.default.get('awsRegion'),
    credentials: {
        accessKeyId: config_1.default.get('awsAccessKeyID'),
        secretAccessKey: config_1.default.get('awsSecretAccessKey'),
    },
});
/**
 *
 * @param files files to upload
 * @param location location to upload the files to format: 'folder/'
 * @returns
 */
const uploadToS3 = (
// eslint-disable-next-line no-undef
files, location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!files) {
            return [];
        }
        const filesArray = Array.isArray(files) ? files : [files];
        const uploadResults = [];
        for (const file of filesArray) {
            const params = {
                Bucket: config_1.default.get('awsBucketName'),
                Key: `${location}${file.originalname}`,
                Body: file.buffer,
                // ACL: 'public-read',
                ContentType: file.mimetype,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            yield s3.send(command);
            uploadResults.push(`${config_1.default.get('cloudfrontBaseUrl')}/${params.Key}`);
        }
        return uploadResults; // Return an array of uploaded file details
    }
    catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
});
exports.uploadToS3 = uploadToS3;
const deleteFromS3 = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Bucket: config_1.default.get('awsBucketName'),
            Key: key,
        };
        const command = new client_s3_1.DeleteObjectCommand(params);
        yield s3.send(command);
        console.log(`File deleted: ${key}`);
        return true;
    }
    catch (error) {
        console.error('Error deleting from S3:', error);
        return false;
    }
});
exports.deleteFromS3 = deleteFromS3;
//# sourceMappingURL=awsS3.service.js.map