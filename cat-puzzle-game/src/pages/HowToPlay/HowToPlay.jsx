import { BookOpen, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import RuleCard from "../../components/RuleCard/RuleCard";
import Button from "../../components/Button/Button";
import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";

import thinkingCat from "../../assets/mascot/thinking.png";
import happyCat from "../../assets/mascot/happy.png";
import normalCat from "../../assets/mascot/normal.png";
import sadCat from "../../assets/mascot/sad.png";

function HowToPlay() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] p-6">

      <BackgroundDecoration />

      <div className="relative z-10 max-w-6xl mx-auto">

        <TopBar title="How To Play" />

        {/* Hero */}

        <div className="text-center mt-6 mb-10">

          <BookOpen
            size={60}
            className="mx-auto text-[#7C5CFF]"
          />

          <h2 className="text-4xl font-bold mt-4 text-[#2E2E3A]">
            Learn The Rules
          </h2>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Place one cat in every colored region while following all the
            puzzle rules.
          </p>

        </div>

        {/* Rules */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* Rule 1 */}

          <RuleCard
            icon={
              <img
                src={thinkingCat}
                alt="Thinking Cat"
                className="w-20"
              />
            }
            title="One Cat Per Region"
            description="Every colored region must contain exactly one cat."
          >

            <div className="grid grid-cols-3 gap-2">

              <div className="w-12 h-12 rounded-lg bg-pink-200"></div>

              <div className="w-12 h-12 rounded-lg bg-pink-200"></div>

              <div className="w-12 h-12 rounded-lg bg-blue-200"></div>

              <div className="w-12 h-12 rounded-lg bg-pink-200 flex items-center justify-center">

                <img
                  src={happyCat}
                  alt=""
                  className="w-8"
                />

              </div>

              <div className="w-12 h-12 rounded-lg bg-pink-200"></div>

              <div className="w-12 h-12 rounded-lg bg-blue-200"></div>

              <div className="w-12 h-12 rounded-lg bg-yellow-200"></div>

              <div className="w-12 h-12 rounded-lg bg-yellow-200"></div>

              <div className="w-12 h-12 rounded-lg bg-blue-200"></div>

            </div>

          </RuleCard>

          {/* Rule 2 */}

          <RuleCard
            icon={
              <img
                src={normalCat}
                alt=""
                className="w-20"
              />
            }
            title="One Cat Per Row"
            description="Each row can contain only one cat."
          >

            <div className="grid grid-cols-4 gap-2">

              <div className="w-12 h-12 rounded-lg bg-indigo-200 flex items-center justify-center">

                <img
                  src={happyCat}
                  alt=""
                  className="w-8"
                />

              </div>

              <div className="w-12 h-12 rounded-lg bg-gray-200"></div>

              <div className="w-12 h-12 rounded-lg bg-gray-200"></div>

              <div className="w-12 h-12 rounded-lg bg-gray-200"></div>

            </div>

          </RuleCard>

          {/* Rule 3 */}

          <RuleCard
            icon={
              <img
                src={happyCat}
                alt=""
                className="w-20"
              />
            }
            title="One Cat Per Column"
            description="Each column can contain only one cat."
          >

            <div className="grid grid-cols-1 gap-2">

              <div className="w-12 h-12 rounded-lg bg-indigo-200 flex items-center justify-center">

                <img
                  src={happyCat}
                  alt=""
                  className="w-8"
                />

              </div>

              <div className="w-12 h-12 rounded-lg bg-gray-200"></div>

              <div className="w-12 h-12 rounded-lg bg-gray-200"></div>

              <div className="w-12 h-12 rounded-lg bg-gray-200"></div>

            </div>

          </RuleCard>

          {/* Rule 4 */}

          <RuleCard
            icon={
              <img
                src={sadCat}
                alt=""
                className="w-20"
              />
            }
            title="Cats Cannot Touch"
            description="Cats cannot touch each other, even diagonally."
          >

            <div className="grid grid-cols-3 gap-2">

              <div className="w-12 h-12 rounded-lg bg-red-200 flex items-center justify-center">

                <img
                  src={happyCat}
                  alt=""
                  className="w-8"
                />

              </div>

              <div className="w-12 h-12 rounded-lg bg-red-300 flex items-center justify-center text-xl">
                ✕
              </div>

              <div className="w-12 h-12 rounded-lg bg-red-200 flex items-center justify-center">

                <img
                  src={happyCat}
                  alt=""
                  className="w-8"
                />

              </div>

            </div>

          </RuleCard>

        </div>

        {/* Tip */}

        <div className="mt-10 rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg p-6">

          <h3 className="text-2xl font-bold text-[#2E2E3A]">
            💡 Pro Tip
          </h3>

          <p className="mt-3 text-gray-600 leading-7">
            Start with rows, columns or regions where only one position is
            possible. Solving easy placements first makes the remaining
            puzzle much easier.
          </p>

        </div>

        {/* Start */}

        <div className="mt-10 max-w-sm mx-auto">

          <Button
            text="Start Playing"
            icon={<Play size={22} />}
            onClick={() => navigate("/levels")}
            className="bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5]"
          />

        </div>

      </div>

    </div>
  );
}

export default HowToPlay;