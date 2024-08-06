import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface GameResults {
    gameResults: string[];
}

interface State {
    gameResults: string[];
}

interface Action {
    addGameResults: (arg: string) => void;
}

const useGameStore = create(
    persist<State & Action>(
        (set) => ({
            gameResults: [],
            addGameResults: (gameResult) =>
                set((state) => ({
                    gameResults: [...state.gameResults, gameResult],
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
