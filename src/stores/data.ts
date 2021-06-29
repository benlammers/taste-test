import { writable } from 'svelte/store';

export interface ListItemType {
    name: string;
    id: number;
}

export interface ResultItemType {
    person: number;
    rankings: number[];
}

export const data = (() => {
    const { subscribe, set, update } = writable<{
        samples: ListItemType[];
        persons: ListItemType[];
        results: ResultItemType[];
    }>({
        samples: [
            { name: 'guoda', id: 1 },
            { name: 'cheddar', id: 2 },
            { name: 'mozerella', id: 3 },
            { name: 'parmesan', id: 4 },
        ],
        persons: [
            { name: 'Ben', id: 1 },
            { name: 'Mad', id: 2 },
            { name: 'George', id: 3 },
        ],
        results: [
            {
                person: 1,
                rankings: [1, 2, 3, 4],
            },
            {
                person: 2,
                rankings: [1, 2, 3, 4],
            },
            {
                person: 3,
                rankings: [1, 2, 3, 4],
            },
        ],
        // samples: [],
        // persons: [],
        // results: [],
    });

    const addSample = (newSample: string): void => {
        update(({ samples, persons, results }) => {
            let newSampleId: number;

            if (samples.length > 0) {
                newSampleId = samples[samples.length - 1].id + 1;
            } else {
                newSampleId = 1;
            }

            return {
                samples: [...samples, { name: newSample, id: newSampleId }],
                persons,
                results: results.map((result) => {
                    return {
                        ...result,
                        rankings: [...result.rankings, newSampleId],
                    };
                }),
            };
        });
    };

    const removeSample = (sampleId: number): void => {
        update(({ samples, persons, results }) => {
            return {
                samples: samples.filter((sample) => sample.id !== sampleId),
                persons,
                results: results.map((result) => {
                    return {
                        ...result,
                        rankings: result.rankings.filter((sample) => sample !== sampleId),
                    };
                }),
            };
        });
    };

    const addPerson = (newPerson: string): void => {
        update(({ samples, persons, results }) => {
            let newPersonId: number;

            if (persons.length > 0) {
                newPersonId = persons[persons.length - 1].id + 1;
            } else {
                newPersonId = 1;
            }

            return {
                samples,
                persons: [...persons, { name: newPerson, id: newPersonId }],
                results: [...results, { person: newPersonId, rankings: samples.map((sample) => sample.id) }],
            };
        });
    };

    const removePerson = (personId: number): void => {
        update(({ samples, persons, results }) => {
            return {
                samples,
                persons: persons.filter((person) => person.id !== personId),
                results: results.filter((result) => result.person !== personId),
            };
        });
    };

    const updateRanks = (newResult: ResultItemType): void => {
        update(({ samples, persons, results }) => {
            let resultIndex = results.findIndex((result) => result.person === newResult.person);
            let newResults = [...results];
            newResults[resultIndex] = newResult;

            return {
                samples,
                persons,
                results: newResults,
            };
        });
    };

    return {
        subscribe,
        set,
        update,
        addSample,
        removeSample,
        addPerson,
        removePerson,
        updateRanks,
    };
})();
