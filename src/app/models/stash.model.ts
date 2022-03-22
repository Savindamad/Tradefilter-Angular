import { Item } from "./item.model";

export interface Stash {
    id: string;
    public: boolean;
    accountName: string;
    lastCharacterName: string;
    stash: string;
    stashType: string;
    league: string;
    items: Array<Item>
}