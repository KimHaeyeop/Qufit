export interface MemberData {
    nickname: string;
    locationId: number | null;
    birthYear: number | null;
    gender: string;
    bio: string;
    memberMBTITag?: string;
    memberHobbyTags: string[];
    memberPersonalityTags: string[];
}

export interface TypeData {
    typeAgeMax: number | null;
    typeAgeMin: number | null;
    typeMBTITags: string[];
    typeHobbyTags: string[];
    typePersonalityTags: string[];
}

export type MemberInfoDTO = MemberData & TypeData;
