export interface MemberData {
    nickname: string;
    locationId: number;
    birthYear: number;
    gender: string;
    bio: string;
    memberMBTITag?: string;
    memberHobbyTags: string[];
    memberPersonalityTags: string[];
}

export interface TypeData {
    typeAgeMax: number;
    typeAgeMin: number;
    typeMBTITags: string[];
    typeHobbyTags: string[];
    typePersonalityTags: string[];
}

export type MemberInfoDTO = MemberData & TypeData;
