
export interface IGetParams {
    page: number;
    itemsPerPage: number;
    order: 'asc' | 'desc';
    orderBy: string;
    search: string;
}

// @todo: fix ts
export abstract class ResourceTypeormService {

    protected constructor(private ResourceModel: any) {
    }

    get = async ({ page, itemsPerPage, order, orderBy, search }: IGetParams) => {
        // if (orderBy === '_id') { orderBy = 'id' }

        let filter: any = {};

        if (search) {
            filter = this.getSearchFilter({ search });
        }

        return {
            data: await this.ResourceModel.findAll({
                where: filter,
                ...(orderBy ? { order: [[orderBy, order]] } : {}),
                limit: +itemsPerPage || 15,
                offset: (page - 1) * itemsPerPage || 0
            }),
            total: await this.ResourceModel.count(filter)
        };
    };

    create = async (data: any) => this.ResourceModel.create(data);
    update = async ({ id, ...data }: any) => this.ResourceModel.update(data, { where: { id }});
    remove = async ({ id }: any) => this.ResourceModel.destroy({ where: { id }});
    getOne = async ({ id }: any) => this.ResourceModel.findOne({ where: { id }});

    protected getSearchFilter = ({ search }: { search: string }):any => {
        return {};
    };
}