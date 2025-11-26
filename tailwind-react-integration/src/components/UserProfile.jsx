function UserProfile() {
  return (
    <div class="user-profile bg-gray-100 p-4 sm:p-8 max-w-xs sm:max-w-sm mx-auto my-20 rounded-lg shadow-lg md:p-8 sm:p-4 md:max-w-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img src="https://via.placeholder.com/150" alt=" " className="hover:scale-110 rounded-full w-24 h-24 sm:w-36 sm:h-36 mx-auto sm:w-24 sm:h-24 md:w-36 md:h-36 transition-transform duration-300 ease-in-out"/>
      <h1 class="text-lg sm:text-xl text-blue-800 my-4  md:text-xl hover:text-blue-500">John Doe</h1>
      <p class="text-gray-600 text-sm sm:text-base ">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;