import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Problem = {
    balanceGameId: number;
    content: string;
    scenario1: string;
    scenario2: string;
};

type Result = {
    [balanceGameId: number]: {
        [memberId: number]: number;
    };
};
interface State {
    problems: Problem[];

    results: Result[];
}

interface Action {
    setProblems: (arg: Problem[]) => void;
    setResults: (arg: Result[]) => void;
}

const useGameStore = create(
    persist<State & Action>(
        (set) => ({
            results: [],
            problems: [],

            setResults: (results) =>
                set(() => ({
                    results: results,
                })),
            setProblems: (problems) =>
                set(() => ({
                    problems: problems,
                })),
        }),
        {
            name: 'game-results-store', // Unique name for the storage
            storage: createJSONStorage(() => localStorage), // Use localStorage
        },
    ),
);

export const useResultsStore = () => useGameStore((state) => state.results);
export const useSetResultsStore = () => useGameStore((state) => state.setResults);
export const useProblemsStore = () => useGameStore((state) => state.problems);
export const useSetProblemsStore = () => useGameStore((state) => state.setProblems);
