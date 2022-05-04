import { IParticipant } from "../models/models";

export const serializeUsers = (usersArray: any[]): IParticipant[] => {
    // console.log(usersArray);
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
    console.log(users);
  return users;
};
