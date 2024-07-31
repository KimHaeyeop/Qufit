export interface MemberData {
    nickname: string;
    locationId: number;
    birthYear: number;
    gender: string;
    bio: string;
    memberMBTITag?: string;
    memberHobbyTag: string[];
    memberPersonalityTag: string[];
}

export interface TypeData {
    typeAgeMax: number;
    typeAgeMin: number;
    typeMBTITag: string[];
    typeHobbyTag: string[];
    typePersonalityTag: string[];
}

export type MemberInfoDTO = MemberData & TypeData;
