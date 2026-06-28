import TopBar from "../../components/TopBar/TopBar";
import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";
import Board from "../../components/Board/Board";


function Game() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] p-6">

      <BackgroundDecoration />

      <div className="relative z-10 max-w-4xl mx-auto">

        <TopBar title="Level 1" />

        <div className="flex justify-center mt-12">

          <Board />

        </div>

      </div>

    </div>
  );
}

export default Game;