'use client';

import { useEffect } from 'react';
import { useMenuStore } from '@/store/menuStore';

export default function Home() {
  const { dailyMenu, weeklyMenu, loading, error, generateDailyMenu, generateWeeklyMenu } = useMenuStore();

  useEffect(() => {
    generateDailyMenu();
  }, [generateDailyMenu]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">VeganFlemme</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {dailyMenu && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Menu du jour</h2>
          <ul className="list-disc pl-6">
            <li>Petit-déjeuner : {dailyMenu.breakfast.name}</li>
            <li>Déjeuner : {dailyMenu.lunch.name}</li>
            <li>Dîner : {dailyMenu.dinner.name}</li>
          </ul>
          <p className="mt-2">Calories totales : {dailyMenu.totalNutrition.calories}</p>
        </div>
      )}
      {weeklyMenu.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Menu de la semaine</h2>
          <ul className="list-disc pl-6">
            {weeklyMenu.map((menu, index) => (
              <li key={index}>
                Jour {index + 1} : {menu.breakfast.name}, {menu.lunch.name}, {menu.dinner.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex space-x-4">
        <button
          onClick={generateDailyMenu}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Générer menu du jour
        </button>
        <button
          onClick={generateWeeklyMenu}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Générer menu semaine
        </button>
      </div>
    </main>
  );
}
