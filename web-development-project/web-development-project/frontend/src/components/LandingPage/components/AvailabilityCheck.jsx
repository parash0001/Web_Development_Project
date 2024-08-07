const AvailabilityCheck = () => {
  return (
    <div className="relative bg-white w-[76%]  mx-auto top-[-3.8rem] rounded-lg h-[130px]">
      <div className="w-[97%] h-[80px] relative flex justify-center mx-auto top-[12%] items-center  gap-x-7">
        <div>
          <label className="block mb-2 text-base font-semibold text-gray-900">
            Check In
          </label>
          <input
            type="text"
            className="block w-[200px] p-3 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 text-base focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-base font-semibold text-gray-900">
            Check Out
          </label>
          <input
            type="text"
            className="block w-[200px] p-3 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 text-base focus:ring-blue-500"
          />
        </div>
        <form>
          <label className="block mb-2 text-base font-semibold text-black">
            Adults
          </label>
          <select className="bg-gray-50 border w-[100px] px-1 py-3 items-center text-gray-500 border-gray-300  text-base rounded-sm">
            <option selected>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </form>
        <form>
          <label className="block mb-2 text-base font-semibold text-gray-900">
            Children
          </label>
          <select className="bg-gray-50 border   w-[100px] text-gray-500 border-gray-300  text-sm rounded-sm px-1 py-3 ">
            <option selected>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </form>

        <button className="bg-yellow-500 capitalize relative top-4 px-12 py-2 text-center rounded-3xl text-xl text-white">
          check availability
        </button>
      </div>
    </div>
  );
};

export default AvailabilityCheck;
