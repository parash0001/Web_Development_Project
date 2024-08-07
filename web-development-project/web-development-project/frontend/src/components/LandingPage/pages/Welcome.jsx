import bedimage from "../../../assets/img/Landing Page/bedImage.jpg";
import smImage from "../../../assets/img/Landing Page/smImage.jpg";
import Button from "../components/Button";

const Welcome = ({ className }) => {
  return (
    <>
      <div className={`${className} bg-gray-200`}>
        <div className="flex flex-row gap-12 pb-16 mx-36 pt-36">
          <div className="welcome content text-start  space-y-5  w-[40%]">
            <h1 className="capitalize text-5xl font-serif  font-semibold">
              welcome!
            </h1>
            <p className="w-[90%] text-lg tracking-[.2px] text-justify leading-[1.6] text-slate-600">
              Hotels King at Dolakha, Nepal, is a hidden gem where tranquility
              and serenity prevail.This serene retreat is where the blind texts
              find their abode,separated in peaceful seclusion. Situated in the
              enchanting Bookmarksgrove, right at the coast of the Semantics a
              vast and tranquil language ocean Hotels king at Dolakha offers a
              unique and immersive escape from the mundane.Feel free to add more
              specific details about the hotel's amenities and features as
              needed.
            </p>
            <Button />
          </div>

          <div className="relative pr-10">
            <img
              src={bedimage}
              className="rounded w-[520px] h-[380px] "
              alt="img"
            />
            <img
              src={smImage}
              className="absolute bottom-[-1rem] w-60 h-60 right-[-5rem] border-gray-200  rounded-full border-[10px]"
              alt="smallImg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
