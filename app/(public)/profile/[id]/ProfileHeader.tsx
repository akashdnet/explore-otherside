import { UserProfile } from './types';

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <div className="rounded-xl bg-card dark:bg-card-dark p-6 shadow-sm @container">
      <div className="flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
        <div className="flex items-center gap-6">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full shrink-0 size-32"
            data-alt={`Profile picture of ${profile.name}`}
            style={{ backgroundImage: `url("${profile.profileImage}")` }}
          />
          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-3xl font-bold tracking-tight">{profile.name}, {profile.age}</h1>
            <p className="text-text-secondary dark:text-text-secondary-dark text-base font-normal">
              From {profile.location}
            </p>
            <p className="text-text-secondary dark:text-text-secondary-dark text-base font-normal mt-2 max-w-md">
              {profile.bio}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProfileHeader;