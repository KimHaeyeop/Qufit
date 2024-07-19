import { faker, fakerKO } from '@faker-js/faker';

interface UserInfoProps {
    nickname: string;
}

interface RoomInfoProps {
    id: string;
    title: string;
    tags: string[];
}

export const UserInfoDummy: UserInfoProps = {
    nickname: faker.lorem.word() + fakerKO.person.firstName(),
};

export const RoomsInfoDummy: RoomInfoProps[] = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    title: fakerKO.lorem.sentence(),
    tags: ['태그1', '태그2', '태그3', '태그dddd4', '태그5', '태그6ddddddddd'].slice(
        0,
        Math.floor(Math.random() * 6) + 1,
    ),
}));
