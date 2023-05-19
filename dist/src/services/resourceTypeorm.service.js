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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceTypeormService = void 0;
// @todo: fix ts
class ResourceTypeormService {
    constructor(ResourceModel) {
        this.ResourceModel = ResourceModel;
        this.get = ({ page, itemsPerPage, order, orderBy, search }) => __awaiter(this, void 0, void 0, function* () {
            // if (orderBy === '_id') { orderBy = 'id' }
            let filter = {};
            if (search) {
                filter = this.getSearchFilter({ search });
            }
            return {
                data: yield this.ResourceModel.findAll(Object.assign(Object.assign({ where: filter }, (orderBy ? { order: [[orderBy, order]] } : {})), { limit: +itemsPerPage || 15, offset: (page - 1) * itemsPerPage || 0 })),
                total: yield this.ResourceModel.count(filter)
            };
        });
        this.create = (data) => __awaiter(this, void 0, void 0, function* () { return this.ResourceModel.create(data); });
        this.update = (_a) => __awaiter(this, void 0, void 0, function* () {
            var { id } = _a, data = __rest(_a, ["id"]);
            return this.ResourceModel.update(data, { where: { id } });
        });
        this.remove = ({ id }) => __awaiter(this, void 0, void 0, function* () { return this.ResourceModel.destroy({ where: { id } }); });
        this.getOne = ({ id }) => __awaiter(this, void 0, void 0, function* () { return this.ResourceModel.findOne({ where: { id } }); });
        this.getSearchFilter = ({ search }) => {
            return {};
        };
    }
}
exports.ResourceTypeormService = ResourceTypeormService;
//# sourceMappingURL=resourceTypeorm.service.js.map