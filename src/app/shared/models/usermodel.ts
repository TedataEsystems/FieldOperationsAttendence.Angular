import { ImageModel } from './ImageModel';

export class Usermodel {
  [x: string]: any;
    constructor(
        public  id: number,
        public  name: string,
        public  employeeNumber:string,
        public  department :string,
        public  userPassword :string,
        public  nationalId :string,
        public  phoneNumber :string,
        public  location :string,
        public  seniorId :number,
        public  teamId :number,
        public  roleId :number,
        public  teamName :string,
        public  roleName :string,
        public  seniorName :string,
        public  creationDate :string,
        public  joiningDate :string,
       // public  imageId :number,
       // public  imagePath :string,
        public  passwordChanged :boolean,
        public  isDeleted :string,
        public creator:number,
        public images:ImageModel[]
    )
    {

    }
}
