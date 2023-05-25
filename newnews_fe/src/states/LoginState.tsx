import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface loginStateType {
    isLogin?: boolean,
    username?: string | null,
    password?: string | null,
    id?: number | null,
}

const { persistAtom } = recoilPersist({
    key: 'loginLocal',
    storage: localStorage,
});

export const LoginState = atom<loginStateType[]>({
    key: 'LoginState',
    default: [{
        isLogin: false,
        username: null,
        password: null,
        id: null,
    }],
    effects_UNSTABLE: [persistAtom],
});