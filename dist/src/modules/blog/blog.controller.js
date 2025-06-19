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
exports.getUniqueBlog = exports.getBlogHandler = exports.updateBlogHandler = exports.deleteBlogHandler = exports.createBlogHandler = void 0;
const utils_1 = require("../utils");
const _1 = require(".");
const appError_1 = __importDefault(require("../utils/appError"));
const functions_1 = require("../utils/functions");
const createBlogHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, content, featuredImageId, categoryIds, tags } = req.body;
        yield _1.blogServices.createBlog({
            slug: (0, functions_1.Slugify)(title),
            title,
            description,
            content,
            featuredImageId,
            categories: {
                create: categoryIds === null || categoryIds === void 0 ? void 0 : categoryIds.map((categoryId) => ({
                    categoryId,
                    assignedBy: req.user.username,
                })),
            },
            tags,
            authorId: req.user.id,
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
});
exports.createBlogHandler = createBlogHandler;
const deleteBlogHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield _1.blogServices.updateBlog({ id }, { isDeleted: true });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Blog Deleted Successfully'));
    }
    catch (err) {
        if (err.code === 'P2003') {
            return next(new appError_1.default(400, "Can't delete data, it's used in other tables."));
        }
        next(err);
    }
});
exports.deleteBlogHandler = deleteBlogHandler;
const updateBlogHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, content, categoryIds, featuredImageId, tags, isPublished } = req.body;
        yield _1.blogServices.updateBlog({
            id,
        }, {
            title,
            description,
            content,
            featuredImageId,
            categories: {
                deleteMany: {},
                create: categoryIds === null || categoryIds === void 0 ? void 0 : categoryIds.map((categoryId) => ({
                    categoryId,
                    assignedBy: req.user.username,
                })),
            },
            tags,
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
});
exports.updateBlogHandler = updateBlogHandler;
const getBlogHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, page, limit } = req.query;
        const blog = yield _1.blogServices.getAllBlog(search, page ? Number(page) : undefined, limit ? Number(limit) : undefined, req.hasAccess
            ? {}
            : {
                isPublished: true,
            }, Object.assign({ id: true, title: true, description: true, slug: true, content: false, tags: true, featuredImage: {
                select: {
                    id: true,
                    url: true,
                    type: true,
                },
            }, author: {
                select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    photo: true,
                },
            }, categories: {
                select: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            }, createdAt: true }, (req.hasAccess
            ? {
                isPublished: true,
                updatedAt: true,
                createdBy: true,
                updatedBy: true,
            }
            : {})));
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', blog));
    }
    catch (err) {
        next(err);
    }
});
exports.getBlogHandler = getBlogHandler;
const getUniqueBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blogs = yield _1.blogServices.getUniqueBlog(Object.assign({ id: (0, functions_1.isUUID)(id) ? id : undefined, slug: !(0, functions_1.isUUID)(id) ? id : undefined }, (req.hasAccess
            ? {}
            : {
                isPublished: true,
            })), Object.assign({ id: true, title: true, description: true, slug: true, content: true, tags: true, featuredImage: {
                select: {
                    id: true,
                    url: true,
                    type: true,
                },
            }, author: {
                select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    photo: true,
                },
            }, categories: {
                select: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            }, createdAt: true }, (req.hasAccess
            ? {
                isPublished: true,
                updatedAt: true,
                createdBy: true,
                updatedBy: true,
                featuredImageId: true,
            }
            : {})));
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', blogs));
    }
    catch (err) {
        next(err);
    }
});
exports.getUniqueBlog = getUniqueBlog;
//# sourceMappingURL=blog.controller.js.map