import { getUserStyles } from "./utils/userStyles";


const UserCard = ({ user }) => {
  const { bg, text, border, button } = getUserStyles(user.userType);

  return (
    <div className={`p-4 rounded shadow ${bg} ${text} border ${border}`}>
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="capitalize">{user.userType} Member</p>

      {/* Button with dynamic styling */}
      <button className={`mt-4 px-4 py-2 rounded ${button}`}>
        View Profile
      </button>
    </div>
  );
};

export default UserCard;
