"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobOpeningById = exports.getJobOpeningHandler = exports.updateJobOpeningHandler = exports.deleteJobOpeningHandler = exports.applyJobOpeningHandler = exports.createJobOpeningHandler = void 0;
const utils_1 = require("../utils");
const _1 = require(".");
const appError_1 = __importDefault(require("../utils/appError"));
const upload_1 = require("../upload");
const crypto_1 = __importDefault(require("crypto"));
const email_1 = __importDefault(require("../email/email"));
const createJobOpeningHandler = async (req, res, next) => {
    try {
        const { title, description, locationId, experience } = req.body;
        await _1.jobOpeningServices.createJobOpening({
            title,
            description,
            locationId,
            experience,
            createdBy: req.user.username,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Created Successfully'));
    }
    catch (err) {
        if (err.code === 'P2002') {
            return next(new appError_1.default(400, 'Duplicate entries are not allowed.'));
        }
        next(err);
    }
};
exports.createJobOpeningHandler = createJobOpeningHandler;
const applyJobOpeningHandler = async (req, res, next) => {
    try {
        const { fullName, jobOpeningId, email, phone, coverLetter, linkedIn, wheredidyouhear, hasSubscribedToNewsletter, } = req.body;
        req.file.originalname = `${fullName.split(' ').join('-').toLowerCase()}-${crypto_1.default.randomUUID()}.pdf`;
        const resume = await upload_1.awsS3services.uploadToS3(req.file, 'resume-infutrix/');
        const jobOpening = await _1.jobOpeningServices.getUniqueJobOpening({ id: jobOpeningId });
        await _1.jobOpeningServices.createJobApplication({
            fullName,
            jobOpeningId,
            email,
            phone,
            coverLetter,
            linkedIn,
            resume: resume[0],
            wheredidyouhear,
            hasSubscribedToNewsletter: hasSubscribedToNewsletter === 'yes',
            createdBy: fullName,
        });
        new email_1.default({
            email,
            context: { fullName, job_title: jobOpening.title },
        }).sendjobApplicationMail();
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Created Successfully'));
    }
    catch (err) {
        await upload_1.awsS3services.deleteFromS3(`resume-infutrix/${req.file.originalname}`);
        if (err.code === 'P2002') {
            return next(new appError_1.default(400, 'Duplicate entries are not allowed.'));
        }
        next(err);
    }
};
exports.applyJobOpeningHandler = applyJobOpeningHandler;
const deleteJobOpeningHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        await _1.jobOpeningServices.deleteJobOpening({ id });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'JobOpening Deleted Successfully'));
    }
    catch (err) {
        if (err.code === 'P2003') {
            return next(new appError_1.default(400, "Can't delete data, it's used in other tables."));
        }
        next(err);
    }
};
exports.deleteJobOpeningHandler = deleteJobOpeningHandler;
const updateJobOpeningHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, locationId, experience, isPublished } = req.body;
        await _1.jobOpeningServices.updateJobOpening({
            id,
        }, {
            title,
            description,
            locationId,
            experience,
            isPublished,
            updatedBy: req.user.username,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Updated Successfully'));
    }
    catch (err) {
        if (err.code === 'P2002') {
            return next(new appError_1.default(400, 'Duplicate entries are not allowed.'));
        }
        next(err);
    }
};
exports.updateJobOpeningHandler = updateJobOpeningHandler;
const getJobOpeningHandler = async (req, res, next) => {
    try {
        const { search, page, limit } = req.query;
        console.log(req.hasAccess);
        const jobOpening = await _1.jobOpeningServices.getAllJobOpening(search, page ? Number(page) : undefined, limit ? Number(limit) : undefined, req.hasAccess
            ? {}
            : {
                isPublished: true,
            }, {
            location: {
                select: {
                    id: true,
                    city: true,
                },
            },
            _count: {
                select: {
                    application: true,
                },
            },
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', jobOpening));
    }
    catch (err) {
        next(err);
    }
};
exports.getJobOpeningHandler = getJobOpeningHandler;
const getJobOpeningById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const jobOpenings = await _1.jobOpeningServices.getUniqueJobOpening({
            id,
            ...(req.hasAccess
                ? {}
                : {
                    isPublished: true,
                }),
        }, {
            location: {
                select: {
                    id: true,
                    city: true,
                },
            },
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', jobOpenings));
    }
    catch (err) {
        next(err);
    }
};
exports.getJobOpeningById = getJobOpeningById;
//# sourceMappingURL=jobOpening.controller.js.map