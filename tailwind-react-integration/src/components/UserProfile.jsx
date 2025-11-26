function UserProfile() {
  return (
    <div class="user-profile bg-gray-100 p-4 sm:p-8 max-w-xs sm:max-w-sm mx-auto my-20 rounded-lg shadow-lg md:p-8 sm:p-4 md:max-w-sm">
      <img src="https://via.placeholder.com/150" alt=" " className="rounded-full w-24 h-24 sm:w-36 sm:h-36 mx-auto"/>
      <h1 class="text-lg sm:text-xl text-blue-800 my-4  md:text-xl">John Doe</h1>
      <p class="text-gray-600 text-sm sm:text-base ">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;