import UserTier from "./UserTier";

export const Tier = () => {
    return (
        <div>
            <div className="w-full h-screen bg-bg2 bg-cover flex items-center justify-center">
                <UserTier />
            </div>
            <div className="w-full h-screen bg-bg2 bg-cover"></div>
        </div>
    );
};