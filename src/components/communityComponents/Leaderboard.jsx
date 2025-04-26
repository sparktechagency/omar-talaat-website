// src/components/Leaderboard.jsx
"use client";

const Leaderboard = ({ leaderboardData }) => {
  return (
    <div className="w-full my-10 ">
      <h2 className="text-lg font-medium text-red-500 mb-4">Leaderboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Streaks Column */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-red text-white p-3 rounded-t-lg">
            <h3 className="font-medium text-center">Streaks</h3>
          </div>
          <LeaderboardTable data={leaderboardData.streaks} />
        </div>

        {/* Total Time Column */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-red text-white p-3 rounded-t-lg">
            <h3 className="font-medium text-center">Total Time</h3>
          </div>
          <LeaderboardTable data={leaderboardData.totalTime} />
        </div>

        {/* Sessions Column */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-red text-white p-3 rounded-t-lg">
            <h3 className="font-medium text-center">Sessions</h3>
          </div>
          <LeaderboardTable data={leaderboardData.sessions} />
        </div>
      </div>
    </div>
  );
};

function LeaderboardTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-sm">
            <th className="px-4 py-2 text-center">#</th>
            <th className="px-4 py-2 text-center">User</th>
            <th className="px-4 py-2 text-center">Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.rank} className="border-t">
              <td className="px-4 py-3 text-sm text-center">{item.rank}</td>
              <td className="px-4 py-3 text-sm text-center">{item.user}</td>
              <td className="px-4 py-3 text-sm text-center">{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
