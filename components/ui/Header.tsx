
const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-6 md:px-10 py-3 bg-card dark:bg-card-dark">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-text-primary dark:text-text-primary-dark">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight">TravelBuddy</h2>
        </div>
        <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-text-secondary dark:text-text-secondary-dark flex bg-background-light dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border-none bg-background-light dark:bg-background-dark h-full placeholder:text-text-secondary dark:placeholder:text-text-secondary-dark px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
              placeholder="Search"
              value=""
            />
          </div>
        </label>
      </div>
      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        <div className="hidden lg:flex items-center gap-8">
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Home</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Explore</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Trips</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Messages</a>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark text-sm font-bold">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark text-sm font-bold">
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            data-alt="User profile picture"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0GSxdXjN9pknz8PC2SEtVSCL7Zt48UelanMdvOk9ZA9PeMCBBxN1aDcplPKL1sfIaKUAVNfC9BdjxLQ5Lyizgv3R1aVUtXrhk6TNyu_3YEI0d-I6qtdW0ZVQnTkl0WpgUpTHGnFLuFasoCYsh79CJLd50C6ymzThEA_rVtHe09hU2-LJl7akCBR8CwaX0KDIdwSq1fV0-OGXJ-nIqaLl9EPZcuT41vbu01ERNmZ5-kGmmZztZnWlupobLEDYcW4RUGDm1rX8nyX0")' }}>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;