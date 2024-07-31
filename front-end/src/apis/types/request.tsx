export interface MemberInfoDTO {
    nickname: string;
    locationId: number;
    birthYear: number;
    gender: string;
    bio: string;
    memberMBTITagId: number;
    memberHobbyTagIds: number[];
    memberPersonalityTagIds: number[];
    typeAgeMax: number;
    typeAgeMin: number;
    typeMBTITagIds: number[];
    typeHobbyTagIds: number[];
    typePersonalityTagIds: number[];
}
