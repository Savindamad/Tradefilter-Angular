import { ItemProperty } from "./item-property.model";

export interface Item {
    id: string;
    name?: string;
    descrText: string;
    secDescrText: string;
    explicitMods: Array<string>;
    typeLine: string;
    properties: Array<ItemProperty>;
    requirements: Array<ItemProperty>;
    additionalProperties: Array<ItemProperty>;
}