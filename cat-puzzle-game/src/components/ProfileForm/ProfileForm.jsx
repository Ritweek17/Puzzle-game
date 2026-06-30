import { User, Activity, CheckSquare } from "lucide-react";

function ProfileForm({ profileData, onChange }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...profileData, [name]: value });
  };

  return (
    <div className="space-y-5">
      {/* Username */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <User size={18} />
          </div>
          <input
            type="text"
            name="username"
            value={profileData.username || ""}
            onChange={handleChange}
            placeholder="Explorer123"
            maxLength={20}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C5CFF] focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gender <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <CheckSquare size={18} />
            </div>
            <select
              name="gender"
              value={profileData.gender || ""}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C5CFF] focus:border-transparent outline-none transition-all appearance-none text-gray-700"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Age Group */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Age Group <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Activity size={18} />
            </div>
            <select
              name="ageGroup"
              value={profileData.ageGroup || ""}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C5CFF] focus:border-transparent outline-none transition-all appearance-none text-gray-700"
            >
              <option value="">Select</option>
              <option value="<13">&lt;13</option>
              <option value="13-17">13–17</option>
              <option value="18-24">18–24</option>
              <option value="25-34">25–34</option>
              <option value="35+">35+</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
