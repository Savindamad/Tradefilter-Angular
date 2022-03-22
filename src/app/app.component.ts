import { Component, OnDestroy, OnInit } from '@angular/core';
import { StashItemService } from './services/stash-item.service';
import { StashItem } from './models/stash-item.model';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { concatMap, interval, startWith, Subscription, switchMap } from 'rxjs';
import { StashTab } from './models/stash-tab.mode';
import { AppConstant } from './constants/app.constant';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    stashItems: Array<StashItem> = [];
    stashItemsFiltered: Array<StashItem> = [];
    leaguesList: Array<SelectItem> = [];
    selectedLeague: string = '';
    search: string = '';
    nextId: string = '';
    stashesSubscription!: Subscription;

    constructor(
        private stashItemService: StashItemService,
        private primengConfig: PrimeNGConfig) { }


    ngOnInit() {
        this.getStashes();
        this.primengConfig.ripple = true;
    }

    getStashes(): void {
        const nextChangeId = this.stashItemService.getNextChangeId();

        const stashes = interval(AppConstant.STASH_DELEY).pipe(
            startWith(0),
            switchMap(() =>
                this.stashItemService.getStashTabById(this.nextId)
            ),
        );

        this.stashesSubscription = nextChangeId.pipe(
            concatMap(id => {
                this.nextId = id;
                return stashes;
            })
        ).subscribe(res => {
            if (res.length) {
                this.nextId = res[0].next_change_id;
                this.stashItems = this.getItemList(res[0]);
                this.stashItemsFiltered = Array.from(this.stashItems);
                this.leaguesList = Array.from(new Set(this.stashItems.map(i => i.league)))
                    .map(league => {
                        return {
                            label: league,
                            value: league
                        }
                    });
                this.leaguesList.unshift({ label: 'All', value: 'all' })
            }
            else {
                this.stashItems = [];
                this.stashItemsFiltered = [];
                this.leaguesList = [];
                this.leaguesList.push({ label: 'All', value: 'all' });

                this.stashesSubscription.unsubscribe();
                this.getStashes();
            }
        });
    }

    getItemList(data: StashTab): Array<StashItem> {
        const stashItems: Array<StashItem> = [];

        data.stashes.forEach(stash => {
            stash.items.forEach(item => {
                if (item.name) {
                    stashItems.push(
                        {
                            id: item.id,
                            name: item.name,
                            description: item.descrText,
                            stashType: stash.stash,
                            league: stash.league,
                            typeLine: item.typeLine,
                            accountName: stash.accountName
                        }
                    );
                }
            });
        });
        return stashItems;
    }

    onFilterChange(value: string): void {
        if (value === 'all') {
            this.stashItemsFiltered = Array.from(this.stashItems);
            return;
        }
        this.stashItemsFiltered = this.stashItems.filter(item => item.league === value);
    }

    ngOnDestroy(): void {
        this.stashesSubscription.unsubscribe();
    }
}
