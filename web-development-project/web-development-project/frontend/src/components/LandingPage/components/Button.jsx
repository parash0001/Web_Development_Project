const Button = () => {
  return (
    <div className="flex flex-col items-center md:flex-row gap-5">
      <button className="bg-yellow-500 capitalize px-5 py-1 text-center rounded-3xl text-lg text-white">
        learn more
      </button>
      <span className="italic">or</span>
      <span className="text-yellow-500 uppercase text-base cursor-pointer hover:underline">
        see video
      </span>
    </div>
  );
};
export default Button;
