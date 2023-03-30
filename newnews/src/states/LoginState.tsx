import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface loginStateType {
    usrename: string,
    password: string,
}

const { persistAtom } = recoilPersist({
    key: 'loginLocal',
    storage: localStorage,
});

export const LoginState = atom<boolean>({
    key: 'LoginState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});