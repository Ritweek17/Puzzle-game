import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";
import TopBar from "../../components/TopBar/TopBar";

function HowToPlay() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] p-6">

      <BackgroundDecoration />

      <div className="relative z-10 max-w-3xl mx-auto">
        <TopBar title="How To Play" />

        <div className="mt-10 rounded-[32px] bg-white/65 backdrop-blur-xl border border-white/60 shadow-[0_35px_70px_rgba(124,92,255,0.18)] p-8">

          <h2 className="text-2xl font-bold text-center text-[#2E2E3A]">
            Learn the Rules
          </h2>

          <p className="mt-4 text-center text-gray-600">
            Place one cat in every colored region without breaking any rules.
          </p>

        </div>
      </div>

    </div>
  );
}

export default HowToPlay;