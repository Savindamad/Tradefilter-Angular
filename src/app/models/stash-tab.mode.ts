import { Stash } from "./stash.model";

export interface StashTab {
    id: string;
    stashes: Array<Stash>;
    next_change_id: string;
}