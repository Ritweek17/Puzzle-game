import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { subscribeToLeaderboard, fetchLeaderboard } from "../../services/leaderboardService";

import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";
import LeaderboardHeader from "../../components/Leaderboard/LeaderboardHeader";
import PodiumCard from "../../components/Leaderboard/PodiumCard";
import PlayerRow from "../../components/Leaderboard/PlayerRow";
import EmptyLeaderboard from "../../components/Leaderboard/EmptyLeaderboard";
import LeaderboardLoading from "../../components/Leaderboard/LeaderboardLoading";
import Button from "../../components/Button/Button";
import { Play } from "lucide-react";

function Leaderboard() {
  const { user, login } = useAuth();
  
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Guest users are blocked from viewing
  const isGuest = !user || user.isGuest;

  useEffect(() => {
    if (isGuest) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToLeaderboard(
      (data) => {
        setPlayers(data);
        setLoading(false);
        setError(false);
      },
      (err) => {
        setLoading(false);
        setError(true);
      }
    );

    return () => unsubscribe();
  }, [isGuest]);

  async function handleRefresh() {
    if (isGuest) return;
    setIsRefreshing(true);
    try {
      const data = await fetchLeaderboard();
      setPlayers(data);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setIsRefreshing(false);
    }
  }

  // --- Render Guest State ---
  if (isGuest) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] p-6">
        <BackgroundDecoration />
        <div className="relative z-10 max-w-xl mx-auto">
          <LeaderboardHeader onRefresh={() => {}} isRefreshing={false} userStatus="guest" />
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-white/60 mt-20">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Global Leaderboard</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Login with Google to sync your progress, compete on the global leaderboard, and see how you rank against other explorers.
            </p>
            <Button
              text="Continue with Google"
              icon={<Play size={20} />}
              onClick={login}
              className="bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5]"
            />
          </div>
        </div>
      </div>
    );
  }

  // --- Render Main States ---
  
  const topThree = players.slice(0, 3);
  const restPlayers = players.slice(3);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] p-6 pb-20">
      <BackgroundDecoration />
      <div className="relative z-10 max-w-xl mx-auto">
        
        <LeaderboardHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} userStatus="synced" />

        {loading ? (
          <LeaderboardLoading />
        ) : error ? (
          <div className="text-center mt-20 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60">
            <h3 className="text-xl font-bold text-red-500 mb-2">Unable to load leaderboard.</h3>
            <p className="text-gray-500 mb-6">Please try again.</p>
            <button
              onClick={handleRefresh}
              className="bg-red-100 text-red-600 px-6 py-2 rounded-full font-bold shadow hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : players.length === 0 ? (
          <EmptyLeaderboard />
        ) : (
          <div className="mt-8">
            {/* Podium */}
            {topThree.length > 0 && (
              <div className="flex justify-center items-end gap-2 sm:gap-4 mb-10 mt-10">
                <PodiumCard player={topThree[1]} rank={2} />
                <PodiumCard player={topThree[0]} rank={1} />
                <PodiumCard player={topThree[2]} rank={3} />
              </div>
            )}

            {/* List */}
            <div className="flex flex-col gap-1">
              {restPlayers.map((player, index) => (
                <PlayerRow
                  key={player.uid}
                  player={player}
                  rank={index + 4} // +4 because 1,2,3 are podium
                  isCurrentPlayer={player.uid === user?.uid}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
