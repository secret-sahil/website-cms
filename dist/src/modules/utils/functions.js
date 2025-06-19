"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slugify = Slugify;
exports.getMediaType = getMediaType;
exports.isUUID = isUUID;
exports.encryptData = encryptData;
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("config"));
function Slugify(input) {
    // const randomSuffix = Math.random().toString(36).substring(2, 7);
    const slug = input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    return `${slug}`;
}
function getMediaType(mimetype) {
    if (mimetype.startsWith('image/')) {
        if (mimetype === 'image/gif')
            return client_1.MediaType.gif;
        return client_1.MediaType.image;
    }
    if (mimetype.startsWith('video/'))
        return client_1.MediaType.video;
    if (mimetype.startsWith('audio/'))
        return client_1.MediaType.audio;
    if (mimetype === 'application/pdf')
        return client_1.MediaType.pdf;
    return client_1.MediaType.other;
}
function isUUID(str) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}
function encryptData(text) {
    if (!text)
        return text;
    const key = crypto_1.default
        .createHash('sha256')
        .update(String(config_1.default.get('dataEncryptionKey')))
        .digest('base64')
        .substr(0, 32);
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}
//# sourceMappingURL=functions.js.map