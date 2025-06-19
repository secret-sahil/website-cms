"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueBlog = exports.getBlogHandler = exports.updateBlogHandler = exports.deleteBlogHandler = exports.createBlogHandler = void 0;
const utils_1 = require("../utils");
const _1 = require(".");
const appError_1 = __importDefault(require("../utils/appError"));
const functions_1 = require("../utils/functions");
const createBlogHandler = async (req, res, next) => {
    try {
        const { title, description, content, featuredImageId, categoryIds, tags } = req.body;
        await _1.blogServices.createBlog({
            slug: (0, functions_1.Slugify)(title),
            title,
            description,
            content,
            featuredImageId,
            categories: {
                create: categoryIds?.map((categoryId) => ({
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
};
exports.createBlogHandler = createBlogHandler;
const deleteBlogHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        await _1.blogServices.updateBlog({ id }, { isDeleted: true });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Blog Deleted Successfully'));
    }
    catch (err) {
        if (err.code === 'P2003') {
            return next(new appError_1.default(400, "Can't delete data, it's used in other tables."));
        }
        next(err);
    }
};
exports.deleteBlogHandler = deleteBlogHandler;
const updateBlogHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, content, categoryIds, featuredImageId, tags, isPublished } = req.body;
        await _1.blogServices.updateBlog({
            id,
        }, {
            title,
            description,
            content,
            featuredImageId,
            categories: {
                deleteMany: {},
                create: categoryIds?.map((categoryId) => ({
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
};
exports.updateBlogHandler = updateBlogHandler;
const getBlogHandler = async (req, res, next) => {
    try {
        const { search, page, limit } = req.query;
        const blog = await _1.blogServices.getAllBlog(search, page ? Number(page) : undefined, limit ? Number(limit) : undefined, req.hasAccess
            ? {}
            : {
                isPublished: true,
            }, {
            id: true,
            title: true,
            description: true,
            slug: true,
            content: false,
            tags: true,
            featuredImage: {
                select: {
                    id: true,
                    url: true,
                    type: true,
                },
            },
            author: {
                select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    photo: true,
                },
            },
            categories: {
                select: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            },
            createdAt: true,
            ...(req.hasAccess
                ? {
                    isPublished: true,
                    updatedAt: true,
                    createdBy: true,
                    updatedBy: true,
                }
                : {}),
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', blog));
    }
    catch (err) {
        next(err);
    }
};
exports.getBlogHandler = getBlogHandler;
const getUniqueBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blogs = await _1.blogServices.getUniqueBlog({
            id: (0, functions_1.isUUID)(id) ? id : undefined,
            slug: !(0, functions_1.isUUID)(id) ? id : undefined,
            ...(req.hasAccess
                ? {}
                : {
                    isPublished: true,
                }),
        }, {
            id: true,
            title: true,
            description: true,
            slug: true,
            content: true,
            tags: true,
            featuredImage: {
                select: {
                    id: true,
                    url: true,
                    type: true,
                },
            },
            author: {
                select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    photo: true,
                },
            },
            categories: {
                select: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            },
            createdAt: true,
            ...(req.hasAccess
                ? {
                    isPublished: true,
                    updatedAt: true,
                    createdBy: true,
                    updatedBy: true,
                    featuredImageId: true,
                }
                : {}),
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', blogs));
    }
    catch (err) {
        next(err);
    }
};
exports.getUniqueBlog = getUniqueBlog;
//# sourceMappingURL=blog.controller.js.map