import { UserRoundPen } from "lucide-react";

const ProfileIcon = () => {
  return (
    <div className="bg-[#d8d8d865] w-18 h-18 rounded-full flex justify-center items-center shadow-inner">
      <div className="bg-white w-14 h-14 shadow-md flex justify-center items-center rounded-full">
        <UserRoundPen className="text-[#000000a0]" />
      </div>
    </div>
  );
};

export default ProfileIcon;
