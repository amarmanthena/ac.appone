export interface IUserDto {
    id: number;
    firstName: string;
    surname: string;
    usersdatumId: string;
}

export class UserDto implements IUserDto {
    public constructor(init?: Partial<IUserDto>) {
        Object.assign(this, init);
      }
      public id: number;
      public firstName: string;
      public surname: string;
      public usersdatumId = 'api';
}
