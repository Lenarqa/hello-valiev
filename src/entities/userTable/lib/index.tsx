import { IParticipant } from "../../../shared/models/models";

export const serializeUsers = (usersArray: any[]): IParticipant[] => {
    const users:IParticipant[] = usersArray.map(user => {
        
        const serializedUser: IParticipant = {
          id: user.id,
          name: user.firstName + " " + user.lastName,
          imgUrl: user.profileImage,
          aboutMe: user.aboutMe,
          status: user.academyStatus,
        };
        return serializedUser;
    })
  return users;
};
