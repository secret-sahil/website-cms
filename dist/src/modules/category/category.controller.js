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
exports.getCategoryById = exports.getCategoryHandler = exports.updateCategoryHandler = exports.deleteCategoryHandler = exports.createCategoryHandler = void 0;
const utils_1 = require("../utils");
const _1 = require(".");
const functions_1 = require("../utils/functions");
const appError_1 = __importDefault(require("../utils/appError"));
const createCategoryHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        yield _1.categoryServices.createCategory({
            name,
            slug: (0, functions_1.Slugify)(name),
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
exports.createCategoryHandler = createCategoryHandler;
const deleteCategoryHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield _1.categoryServices.deleteCategory({ id });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Category Deleted Successfully'));
    }
    catch (err) {
        if (err.code === 'P2003') {
            return next(new appError_1.default(400, "Can't delete data, it's used in other tables."));
        }
        next(err);
    }
});
exports.deleteCategoryHandler = deleteCategoryHandler;
const updateCategoryHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        yield _1.categoryServices.updateCategory({
            id,
        }, {
            name,
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
exports.updateCategoryHandler = updateCategoryHandler;
const getCategoryHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, page, limit } = req.query;
        const category = yield _1.categoryServices.getAllCategory(search, page ? Number(page) : undefined, limit ? Number(limit) : undefined);
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', category));
    }
    catch (err) {
        next(err);
    }
});
exports.getCategoryHandler = getCategoryHandler;
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categorys = yield _1.categoryServices.getUniqueCategory({
            id,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', categorys));
    }
    catch (err) {
        next(err);
    }
});
exports.getCategoryById = getCategoryById;
//# sourceMappingURL=category.controller.js.map