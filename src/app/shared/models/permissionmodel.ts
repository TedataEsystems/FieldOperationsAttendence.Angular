import { ImageModel } from './ImageModel';

export class Permissionmodel {
    constructor(
           public id: number,
           public name: string,
           public creationDate: string,
           public timeFrom: string,
           public timeTo: string,
           public duration: string,
           public details: string,
           public userId: number,
           public userName: string,
           public permissionTypeId: number,
           public creator: number,
           public teamid: number,
           public images:ImageModel[]
    ){}
}
