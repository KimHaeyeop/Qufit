import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Problem = {
    balanceGameId: number;
    content: string;
    scenario1: string;
    scenario2: string;
};

interface State {
    problems: Problem[];

    gameResults: string[];
}

interface Action {
    setProblems: (arg: Problem[]) => void;
    addGameResults: (arg: string) => void;
}

const useGameStore = create(
    persist<State & Action>(
        (set) => ({
            gameResults: [],
            problems: [],

            addGameResults: (gameResult) =>
                set((state) => ({
                    gameResults: [...state.gameResults, gameResult],
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

export const useGameResultsStore = () => useGameStore((state) => state.gameResults);
export const useAddGameResultsStore = () => useGameStore((state) => state.addGameResults);
export const useProblemsStore = () => useGameStore((state) => state.problems);
export const useSetProblemsStore = () => useGameStore((state) => state.setProblems);
