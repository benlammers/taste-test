import { get, writable } from 'svelte/store';

export interface ListItemType {
    name: string;
    id: number;
}

export interface ResultItemType {
    person: number;
    rankings: number[];
}

export const test = true;

export const data = (() => {
    const { subscribe, set, update } = writable<{
        samples: ListItemType[];
        persons: ListItemType[];
        results: ResultItemType[];
        isAlphanumerical: boolean;
    }>(
        test
            ? {
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
                      { name: 'Billy', id: 4 },
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
                          rankings: [4, 3, 2, 1],
                      },
                      {
                          person: 4,
                          rankings: [4, 3, 2, 1],
                      },
                  ],
                  isAlphanumerical: true,
              }
            : {
                  samples: [],
                  persons: [],
                  results: [],
                  isAlphanumerical: true,
              }
    );

    const addSample = (newSample: string): void => {
        update(({ samples, results, ...store }) => {
            let newSampleId: number;

            if (samples.length > 0) {
                newSampleId = samples[samples.length - 1].id + 1;
            } else {
                newSampleId = 1;
            }

            return {
                ...store,
                samples: [...samples, { name: newSample, id: newSampleId }],
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
        update(({ samples, results, ...store }) => {
            return {
                ...store,
                samples: samples.filter((sample) => sample.id !== sampleId),
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
        update(({ persons, results, samples, ...store }) => {
            let newPersonId: number;

            if (persons.length > 0) {
                newPersonId = persons[persons.length - 1].id + 1;
            } else {
                newPersonId = 1;
            }

            return {
                ...store,
                samples,
                persons: [...persons, { name: newPerson, id: newPersonId }],
                results: [...results, { person: newPersonId, rankings: samples.map((sample) => sample.id) }],
            };
        });
    };

    const removePerson = (personId: number): void => {
        update(({ persons, results, ...store }) => {
            return {
                ...store,
                persons: persons.filter((person) => person.id !== personId),
                results: results.filter((result) => result.person !== personId),
            };
        });
    };

    const updateRanks = (newResult: ResultItemType): void => {
        update(({ results, ...store }) => {
            let resultIndex = results.findIndex((result) => result.person === newResult.person);
            let newResults = [...results];
            newResults[resultIndex] = newResult;

            return {
                ...store,
                results: newResults,
            };
        });
    };

    // const toggleAlphanumerical = (): void => {
    //     update(({ isAlphanumerical, ...store }) => {
    //         return {
    //             ...store,
    //             isAlphanumerical: !isAlphanumerical,
    //         };
    //     });
    // };

    return {
        subscribe,
        set,
        update,
        addSample,
        removeSample,
        addPerson,
        removePerson,
        updateRanks,
        // toggleAlphanumerical,
    };
})();

export const getOrderBySampleId = (id: number): number | string => {
    let { isAlphanumerical, samples } = get(data);
    let index = samples.findIndex((sample) => sample.id === id);

    return isAlphanumerical ? String.fromCharCode(97 + index) : index + 1;
};
